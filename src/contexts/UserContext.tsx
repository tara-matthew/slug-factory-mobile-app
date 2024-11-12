import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../hooks/apiFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IFavourite } from "../contracts/Favourite";
import apiFetch from "../hooks/apiFetch";
import {useAuth} from "./AuthContext";
import {fromResponse} from "../data-transfer-objects/UserData"; // Assuming this is your custom hook for making API requests

// Create the context
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { authState } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                    const fetchedUser = await fetchData("/me");
                    const userData = fromResponse(fetchedUser.data);

                    setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
