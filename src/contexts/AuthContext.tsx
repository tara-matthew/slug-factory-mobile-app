import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchData from "../hooks/apiFetch";
import {fromResponse} from "../data-transfer-objects/UserData";

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

    axios.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error),
    );

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem("token");

            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                console.log(axios.defaults.headers);

                setAuthState({
                    token: token,
                    authenticated: true,
                });

                // await AsyncStorage.removeItem("token");
                // delete axios.defaults.headers.common["Authorization"];
                // setAuthState({
                //     token: null,
                //     authenticated: null
                // })
            }

            // remove headers and set auth state to false within an else?
        };
        loadToken();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            console.log('logging in');
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
            delete axios.defaults.headers.common["Authorization"];

            await AsyncStorage.removeItem("token");
            setAuthState({
                token: null,
                authenticated: false,
            });

            return { error: true };
        }
    };


    const value = {
        onLogin: login,
        authState,
    };

    return <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>;
};
