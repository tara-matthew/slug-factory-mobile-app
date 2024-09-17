import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {parse} from "ts-jest";

// Create a context
const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem("token");
            const user = await AsyncStorage.getItem("user");
            console.log(JSON.parse(user))

            if (token) {
                // set header
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                })

            }
        }
        loadToken();
    }, []);

    const login = async(username: string, password: string) => {
        try {
            const result =  await axios.post('https://q7tupkm52t.sharedwithexpose.com/api/auth/login', {username, password})
            const token = result.data.data.token;
            console.log('here', result);
            setAuthState({
                token: token,
                authenticated: true
            })

            // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await AsyncStorage.setItem("token", result.data.data.token);
            console.log('to here');

            const user = await axios.get('https://q7tupkm52t.sharedwithexpose.com/api/me')
            await AsyncStorage.setItem("user", JSON.stringify(user.data));
            return result;

        } catch (e) {
            console.log(e);
            // console.log(e.response.data.message);
            // console.log(e.response.data.errors);
            return { error: true, msg: (e as any)}
        }
    }

    const value = {
        onLogin: login
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

