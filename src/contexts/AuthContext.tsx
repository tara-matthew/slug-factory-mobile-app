import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchData from "../hooks/apiFetch";
import apiFetch from "../hooks/apiFetch";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
    });

    axios.interceptors.response.use(
        response => response,
        async (error) => {
            if (error.response?.status === 401) {
                console.log("logging out");
                await logout(); // Call logout on 401 Unauthorized
            }
            return Promise.reject(error);
        },
    );

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem("token");

            if (token) {
                try {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    await apiFetch("/me");

                    setAuthState({
                        token: token,
                        authenticated: true,
                    });
                } catch (error) {
                    if (error.response.status === 401) {
                        await logout();
                    }
                }
            } else {
                console.log("no token");
                await logout();
            }
        };
        void loadToken();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            console.log("logging in");
            const result = await fetchData("/auth/login", "POST", { username: username, password: password });
            const token = result.data.token;
            setAuthState({
                token: token,
                authenticated: true,
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await AsyncStorage.setItem("token", token);
            return result;
        } catch (e) {
            console.log(e);
            await logout();

            return { error: true };
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setAuthState({
            token: null,
            authenticated: null,
        });
    };

    const value = {
        onLogin: login,
        logout,
        authState,
    };

    return <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>;
};
