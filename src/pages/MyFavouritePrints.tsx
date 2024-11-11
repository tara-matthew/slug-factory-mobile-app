import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import fetchData from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import { IFavourite } from "../contracts/Favourite";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import { useNavigation } from "@react-navigation/native";
import {usePrints} from "../contexts/PrintsContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;

const MyFavouritePrints = () => {
    const navigation = useNavigation<NavigationProps>();
    const { prints, loading } = usePrints();


    async function handleDataFromChild(item) {
        console.log("my favourite prints level", item);
        navigation.navigate("PrintedDesign", { print: item });
    }

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    if (prints.favourites.length === 0) {
        return (<Text>You have no favourites yet</Text>);
    }

    return (
        <View>
            <Grid items={ prints.favourites } sendDataToParent={ handleDataFromChild }></Grid>
        </View>
    );
};

export default MyFavouritePrints;
