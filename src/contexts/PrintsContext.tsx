import React, {createContext, useContext, useEffect, useState} from 'react';
import apiFetch from '../hooks/apiFetch';
import {useAuth} from "./AuthContext"; // Assuming this is your custom hook for making API requests

// Create the context
const PrintContext = createContext(null);

// Create the PrintProvider component
export const PrintProvider = ({ children }) => {
    const [latestPrints, setLatestPrints] = useState([]);
    const [popularPrints, setPopularPrints] = useState([]);
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
                if (authState.authenticated === true) {
                    const latestResponse = await apiFetch('/prints/latest')
                    const popularResponse = await apiFetch("/my/prints");
                    const randomResponse = await apiFetch("prints/random");
                    setPrints({ latest: latestResponse.data, popular: popularResponse.data, random: randomResponse.data });
                }
            } catch (err) {
                setError(err);
                console.log(err)
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void fetchPrints();
    }, [authState.authenticated]);

    // Function to update a print (for example, when it's favorited)
    const updatePrint = (updatedPrint) => {
        setPrints((previousPrints) => {
            // Build a new object to hold the updated categories
            const updatedCategories = Object.keys(previousPrints).reduce((result, category) => {
                const printsInCategory = previousPrints[category];

                // Map through the current category array to find and update the matching print by ID
                // Assign the updated array back to the corresponding category in the result
                result[category] = printsInCategory.map(print =>
                    print.id === updatedPrint.id ? { ...print, ...updatedPrint } : print,
                );
                return result;
            }, {});

            // Return the entire state, with only the relevant categories updated
            return {
                ...previousPrints,
                ...updatedCategories,
            };
        });
    };




    // Provide state and functions to the rest of the app
    return (
        <PrintContext.Provider value={{ latestPrints, prints, updatePrint }}>
            {children}
        </PrintContext.Provider>
    );
};

// Custom hook to use the context
export const usePrints = () => useContext(PrintContext);
