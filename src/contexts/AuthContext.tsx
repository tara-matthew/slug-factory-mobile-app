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
    // const [user, setUser] = useState({});

    // axios.interceptors.request.use(
    //     async (config) => {
    //         const token = await AsyncStorage.getItem("token");
    //         console.log(token);
    //         if (token) {
    //             config.headers["Authorization"] = `Bearer ${token}`;
    //         } else {
    //             await logout();
    //         }
    //         return config;
    //     },
    //     error => Promise.reject(error),
    // );

    // axios.interceptors.response.use(
    //     response => response,
    //     async error => {
    //         if (error.response?.status === 401) {
    //             console.log('logging out')
    //             await logout(); // Call logout on 401 Unauthorized
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    useEffect(() => {
        const loadToken = async () => {
            console.log('loading token');
            const token = await AsyncStorage.getItem("token");
            console.log('token loaded', token);
            console.log(axios.defaults.headers.common["Authorization"]);

            if (token) {
                try {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    await apiFetch('/me')

                    setAuthState({
                        token: token,
                        authenticated: true,
                    });
                } catch (e) {
                    console.log('expired token', e)
                    await logout();
                }

            } else {
                console.log('no token');
                await logout();
            }

            // remove headers and set auth state to false within an else?
        };
        loadToken();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            console.log("logging in");
            const result = await fetchData("/auth/login", "POST", { username: username, password: password });
            // console.log('result', result.data)
            const token = result.data.token;
            setAuthState({
                token: token,
                authenticated: true,
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await AsyncStorage.setItem("token", token);

            // const user = await fetchData("/me");
            // const userData = fromResponse(user.data);
            // await AsyncStorage.setItem("user", JSON.stringify(userData));
            // setUser(userData);
            return result;
        } catch (e) {
            console.log(e);
            // const message = e.response?.data?.message;
            // console.log('exception', e.response.data.message);
            await logout();

            return { error: true };
        }
    };

    const logout = async() => {
        await AsyncStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setAuthState({
            token: null,
            authenticated: null
        })
    }

    const value = {
        onLogin: login,
        logout,
        authState,
        setAuthState
    };

    return <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>;
};
