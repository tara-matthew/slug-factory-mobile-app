import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../hooks/apiFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IFavourite } from "../contracts/Favourite"; // Assuming this is your custom hook for making API requests

// Create the context
const PrintContext = createContext(null);

export const PrintProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [prints, setPrints] = useState({
        latest: [],
        popular: [],
        random: [],
        favourites: [],
    });

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
                const [latestPrints, popularPrints, randomPrints, favouriteData] = await fetchData(endpoints);
                const favourites = favouriteData.data.map((favourite: IFavourite) => favourite.resource); // TODO separate into a custom hook

                setPrints({
                    latest: latestPrints.data,
                    popular: popularPrints.data,
                    random: randomPrints.data,
                    favourites: favourites,
                });
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
    }, []);

    const updatePrint = (updatedPrint) => {
        setPrints((currentPrints) => {
            const updatedCategories = Object.keys(currentPrints).reduce((result, category) => {
                const printsInCategory = currentPrints[category];

                result[category] = printsInCategory.map(print =>
                    print.id === updatedPrint.id ? { ...print, ...updatedPrint } : print,
                );
                return result;
            }, {});

            return {
                ...currentPrints,
                ...updatedCategories,
            };
        });
    };

    const togglePrint = (print) => {
        setPrints((currentPrints) => {
            const isAlreadyFavourite = currentPrints.favourites.some(favPrint => favPrint.id === print.id);

            const updatedFavourites = isAlreadyFavourite
                ? currentPrints.favourites.filter(favPrint => favPrint.id !== print.id)
                : [...currentPrints.favourites, print];

            return {
                ...currentPrints,
                favourites: updatedFavourites,
            };
        });
    };

    // TODO investigate destructuring prints into its separate properties

    return (
        <PrintContext.Provider value={ { prints, loading, updatePrint, togglePrint } }>
            {children}
        </PrintContext.Provider>
    );
};

export const usePrints = () => useContext(PrintContext);
