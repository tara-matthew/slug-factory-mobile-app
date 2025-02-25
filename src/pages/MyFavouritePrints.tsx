import React from "react";
import { Text, View } from "react-native";
import Grid from "../components/organism/Grid";
import { PrintedDesignNavigationProps } from "../contracts/Navigator";
import { useNavigation } from "@react-navigation/native";
import { usePrints } from "../contexts/PrintsContext";

const MyFavouritePrints = () => {
    const navigation = useNavigation<PrintedDesignNavigationProps>();
    const { prints, loading } = usePrints();

    async function handleDataFromChild(item) {
        navigation.navigate("PrintedDesign", { print_id: item.id, title: item.title });
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
