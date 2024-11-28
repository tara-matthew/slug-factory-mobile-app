import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchData from "../hooks/apiFetch";
import apiFetch from "../hooks/apiFetch";
import * as Device from "expo-device";
import {IAuthContext} from "../contracts/AuthContext";

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
    });
    const [loading, setLoading] = useState(true); // Add loading state

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
                await logout();
            }
            setLoading(false);
        };
        void loadToken();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const deviceName = Device.deviceName;
            const result = await fetchData("/auth/login", "POST", { username: username, password: password, device_name: deviceName });
            const token = result.data.token;
            setAuthState({
                token: token,
                authenticated: true,
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await AsyncStorage.setItem("token", token);
            return result;
        } catch (e) {
            // await logout();

            return { error: true };
        }
    };

    const register = async (name: string, email: string, username: string, password: string, password_confirmation: string) => {
        try {
            await fetchData("/auth/register", "POST", { name: name, email: email, username: username, password: password, password_confirmation: password_confirmation });
        } catch (e) {
            console.error(e.response);
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
        onRegister: register,
        logout,
        authState,
        loading,
    };

    return <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>;
};
