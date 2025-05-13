import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../hooks/apiFetch";
import { IFavourite } from "../contracts/Favourite";

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
            return Object.fromEntries(
                Object.entries(currentPrints).map(([category, prints]) => [
                    category,
                    prints.map(print =>
                        print.id === updatedPrint.id ? { ...print, ...updatedPrint } : print,
                    ),
                ]),
            ) as typeof currentPrints;
        });
    };

    /*
    const updatePrint = (updatedPrint) => {
        setPrints((currentPrints) => {
            const newPrints: typeof currentPrints = {};

            for (const category in currentPrints) {
                const printList = currentPrints[category];

                const updatedPrintList = printList.map((print) => {
                    if (print.id === updatedPrint.id) {
                        return { ...print, ...updatedPrint };
                    } else {
                        return print;
                    }
                });

                newPrints[category] = updatedPrintList;
            }

            return newPrints;
        });
    };
     */

    const toggleFavouritePrint = (updatedPrint) => {
        setPrints((currentPrints) => {
            let updatedFavourites = [...currentPrints.favourites];

            if (updatedPrint.is_favourite) {
                updatedFavourites.push(updatedPrint);
            } else {
                updatedFavourites = updatedFavourites.filter(favPrint => favPrint.id !== updatedPrint.id);
            }

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
