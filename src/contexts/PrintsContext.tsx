import React, { createContext, useState, useEffect, useContext } from 'react';
import apiFetch from '../hooks/apiFetch';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Assuming this is your custom hook for making API requests

// Create the context
const PrintContext = createContext(null);

// Create the PrintProvider component
export const PrintProvider = ({ children }) => {
    const [latestPrints, setLatestPrints] = useState([]);
    const [popularPrints, setPopularPrints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch prints once when the provider is mounted
    useEffect(() => {
        const fetchPrints = async () => {
            try {
                const token = await AsyncStorage.getItem("token");

                const latestResponse = await axios.get("/prints/latest", {headers: {
                    'Authorization': 'Bearer ' + token,
                    }});
                // const popularResponse = await apiFetch("/prints/popular");
                setLatestPrints(latestResponse.data); // Assuming response.data is the prints array
                // setPopularPrints(popularResponse.data);
            } catch (err) {
                setError(err);
                console.log(err)
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void fetchPrints();
    }, []);

    // Function to update a print (for example, when it's favorited)
    const updatePrint = (updatedPrint) => {
        console.log(updatedPrint.is_favourite)
        // console.log(latestPrints);
        // console.log(updatedPrint);
        setLatestPrints((prevPrints) => {
            // Access the data array in prevPrints
            const prints = prevPrints.data;

            // Create a new array where the print with the matching ID is updated
            const updatedPrints = prints.map((print) => {
                // Check if the current print's ID matches the updatedPrint's ID
                if (print.id === updatedPrint.id) {
                    // If IDs match, return a new print object with updated properties
                    return { ...print, ...updatedPrint };
                }

                // If there's no match, return the original print object unchanged
                return print;
            });

            // Return a new state object with the updated prints array inside data
            return {
                ...prevPrints, // Spread the previous state to keep other properties intact
                data: updatedPrints, // Update the data property with the modified array
            };
        });

        console.log(latestPrints)
        // Update latestPrints if the print is in that list

        //
        // // Update popularPrints if the print is in that list
        // setPopularPrints((prevPrints) =>
        //     prevPrints.map((print) => (print.id === updatedPrint.id ? { ...print, ...updatedPrint } : print))
        // );

        // console.log(latestPrints);
    };

    // Provide state and functions to the rest of the app
    return (
        <PrintContext.Provider value={{ latestPrints, updatePrint }}>
            {children}
        </PrintContext.Provider>
    );
};

// Custom hook to use the context
export const usePrints = () => useContext(PrintContext);
