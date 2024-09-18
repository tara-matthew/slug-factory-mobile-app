import { createContext, useContext, useEffect, useState } from 'react';
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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

            if (token) {
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
            const result =  await axios.post('https://vg1qdjy7ez.sharedwithexpose.com/api/auth/login', { username, password })
            const token = result.data.data.token;
            setAuthState({
                token: token,
                authenticated: true
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await AsyncStorage.setItem("token", result.data.data.token);

            const user = await axios.get('https://vg1qdjy7ez.sharedwithexpose.com/api/me')
            await AsyncStorage.setItem("user", JSON.stringify(user.data));
            return result;

        } catch (e) {
            console.log('exception', e);
            delete axios.defaults.headers.common["Authorization"];

            await AsyncStorage.removeItem("token");
            setAuthState({
                token: null,
                authenticated: false
            });

            return { error: true, msg: e }
        }
    }

    const value = {
        onLogin: login,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

