import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import fetchData from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import { IFavourite } from "../contracts/Favourite";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../contracts/Navigator";
import {useNavigation} from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;


const MyFavouritePrints = () => {
    const [loading, setLoading] = useState(true);
    const [favourites, setFavourites] = useState([]);
    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        void getFavourites();
    }, []);

    async function handleDataFromChild(item) {
        console.log('my favourite prints level', item);
        navigation.navigate("PrintedDesign", { print: item });
    }

    const getFavourites = async () => {
        try {
            const favouriteData = await fetchData("/my/favourites?type=printed_design");
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

    if (favourites.length === 0) {
        return (<Text>You have no favourites yet</Text>);
    }

    return (
        <View>
            <Grid items={ favourites } sendDataToParent={handleDataFromChild}></Grid>
        </View>
    );
};

export default MyFavouritePrints;
