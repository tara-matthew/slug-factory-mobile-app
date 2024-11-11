import React, { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../hooks/apiFetch";
import { useAuth } from "./AuthContext"; // Assuming this is your custom hook for making API requests

// Create the context
const PrintContext = createContext(null);

// Create the PrintProvider component
export const PrintProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [prints, setPrints] = useState({
        latest: [],
        popular: [],
        random: [],
    });
    const { authState } = useAuth();

    // Fetch prints once when the provider is mounted
    useEffect(() => {
        const fetchPrints = async () => {
            try {
                if (authState.authenticated) {
                    const latestResponse = await apiFetch("/prints/latest");
                    const popularResponse = await apiFetch("/my/prints");
                    const randomResponse = await apiFetch("prints/random");
                    setPrints({ latest: latestResponse.data, popular: popularResponse.data, random: randomResponse.data });
                }
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void fetchPrints();
    }, [authState.authenticated]);

    const updatePrint = (updatedPrint) => {
        setPrints((previousPrints) => {
            const updatedCategories = Object.keys(previousPrints).reduce((result, category) => {
                const printsInCategory = previousPrints[category];

                result[category] = printsInCategory.map(print =>
                    print.id === updatedPrint.id ? { ...print, ...updatedPrint } : print,
                );
                return result;
            }, {});

            return {
                ...previousPrints,
                ...updatedCategories,
            };
        });
    };

    // Provide state and functions to the rest of the app
    return (
        <PrintContext.Provider value={ { prints, updatePrint } }>
            {children}
        </PrintContext.Provider>
    );
};

// Custom hook to use the context
export const usePrints = () => useContext(PrintContext);
