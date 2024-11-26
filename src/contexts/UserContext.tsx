import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../hooks/apiFetch";
import { fromResponse } from "../data-transfer-objects/UserData"; // Assuming this is your custom hook for making API requests

// Create the context
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await fetchData("/me");
                const userData = fromResponse(fetchedUser.data);

                setUser(userData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        void fetchUser();
    }, []);

    return (
        <UserContext.Provider value={ { user, setUser, loading } }>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
