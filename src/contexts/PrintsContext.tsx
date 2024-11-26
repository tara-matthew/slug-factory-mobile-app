import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../hooks/apiFetch";
import { IFavourite } from "../contracts/Favourite";
// Assuming this is your custom hook for making API requests

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
            } finally {
                setLoading(false);
            }
        };

        void fetchPrints();
    }, []);

    // Updates a print property within every category (categories being latest, popular etc), may need to refactor to update specific categories, or write another method
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

    const toggleFavouritePrint = (print) => {
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
        <PrintContext.Provider value={ { prints, loading, updatePrint, toggleFavouritePrint } }>
            {children}
        </PrintContext.Provider>
    );
};

export const usePrints = () => useContext(PrintContext);
