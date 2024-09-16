import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
            console.log({token})

            if (token) {
                // set header

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
            const result =  await axios.post('https://gcmu1ookz2.sharedwithexpose.com/api/auth/login', {username, password})
            console.log(result.data.data.token)
            setAuthState({
                token: result.data.data.token,
                authenticated: true
            })

            await AsyncStorage.setItem("token", result.data.data.token);

            // set axios headers
        } catch (e) {
            // console.log(e.response.data.message);
            // console.log(e.response.data.errors);
            return { error: true, msg: (e as any).response.data.message}
        }
    }

    const value = {
        onLogin: login
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

