import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../hooks/apiFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuth } from "./AuthContext";
import {IFavourite} from "../contracts/Favourite"; // Assuming this is your custom hook for making API requests

// Create the context
const PrintContext = createContext(null);

// Create the PrintProvider component
export const PrintProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [prints, setPrints] = useState({
        latest: [],
        popular: [],
        random: [],
        // favourites: [],
    });
    const [favouritePrints, setFavouritePrints] = useState([]);

    const { authState } = useAuth();

    useEffect(() => {
        const fetchPrints = async () => {
            // await getUser();
            const endpoints = [
                `/prints/latest`,
                `/my/prints`,
                `/prints/random`,
                `/my/favourites?type=printed_design`,
            ];
            try {
                const [latestPrints, popularPrints, randomPrints, favouritePrints] = await fetchData(endpoints);
                setPrints({
                    latest: latestPrints.data,
                    popular: popularPrints.data,
                    random: randomPrints.data,
                    // favourites: favouritePrints.data,
                });
                const favouriteData = await fetchData(`/my/favourites?type=printed_design`);
                const favourites = favouriteData.data.map((favourite: IFavourite) => favourite.resource); // TODO separate into a custom hook

                setFavouritePrints(favourites);
            } catch (error) {
                console.error("Error in getHomeData", error.response.status);
                if (error.response.status === 401) {
                    // TODO rework to proper logout, perform at a higher level
                    await AsyncStorage.removeItem("token");
                    delete axios.defaults.headers.common["Authorization"];
                }
            } finally {
                setLoading(false);
            }
        };

        void fetchPrints();
    }, [authState.authenticated]);

    const updatePrint = (updatedPrint) => {
        setPrints((currentPrints) => {
            const updatedCategories = Object.keys(currentPrints).reduce((result, category) => {
                const printsInCategory = currentPrints[category];

                result[category] = printsInCategory.map(print =>
                    print.id === updatedPrint.id ? { ...print, ...updatedPrint } : print,
                );
                return result;
            }, {});

            console.log(updatedCategories);

            return {
                ...currentPrints,
                ...updatedCategories,
            };
        });
    };

    const addPrint = (newPrint) => {
        setFavouritePrints((prevFavourites) => {
            const isAlreadyFavourite = prevFavourites.some(favPrint => favPrint.id === newPrint.id);

            if (isAlreadyFavourite) {
                // Remove the print if it's already in the favourites list
                return prevFavourites.filter(favPrint => favPrint.id !== newPrint.id);
            } else {
                // Add the print to the favourites list
                return [...prevFavourites, newPrint];
            }
        });
    };

    return (
        <PrintContext.Provider value={ { prints, favouritePrints, loading, updatePrint, addPrint } }>
            {children}
        </PrintContext.Provider>
    );
};

export const usePrints = () => useContext(PrintContext);
