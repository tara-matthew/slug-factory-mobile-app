import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import fetchData from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import {IFavourite} from "../contracts/Favourite";

const MyFavouritePrints = () => {
    const [loading, setLoading] = useState(true);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        void getFavourites();
    }, []);

    const getFavourites = async () => {
        try {
            const favouriteData = await fetchData("/my/favourites?type=printed_design");
            const favourites = favouriteData.data.map((favourite: IFavourite) => favourite.resource);
            setFavourites(favourites);
        } catch (error) {
            console.error("Error in getting prints", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    if (favourites.length === 0) {
        return (<Text>You have no favourites yet</Text>);
    }

    return (
        <View>
            <Grid items={ favourites }></Grid>
        </View>
    );
};

export default MyFavouritePrints;
