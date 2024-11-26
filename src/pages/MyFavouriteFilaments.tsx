import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import fetchData from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import { IFavourite } from "../contracts/Favourite";
import { useNavigation } from "@react-navigation/native";
import { FilamentNavigationProps } from "../contracts/Navigator";

const MyFavouriteFilaments = () => {
    const [loading, setLoading] = useState(true);
    const [favourites, setFavourites] = useState([]);
    const navigation = useNavigation<FilamentNavigationProps>();

    useEffect(() => {
        void getFavourites();
    }, []);

    async function handleDataFromChild(item) {
        navigation.navigate("Filament", { filament: item });
    }

    const getFavourites = async () => {
        try {
            const favouriteData = await fetchData("/my/favourites?type=printer_filament");
            const favourites = favouriteData.data.map((favourite: IFavourite) => favourite.resource); // TODO separate into a custom hook
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

    if (!favourites.length) {
        return (<Text>You have no favourites yet</Text>);
    }

    return (
        <View>
            <Grid items={ favourites } sendDataToParent={ handleDataFromChild }></Grid>
        </View>
    );
};

export default MyFavouriteFilaments;
