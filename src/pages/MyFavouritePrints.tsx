import React, {useEffect} from "react";
import { Text, View } from "react-native";
import Grid from "../components/organism/Grid";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import { useNavigation } from "@react-navigation/native";
import { usePrints } from "../contexts/PrintsContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;

const MyFavouritePrints = () => {
    const navigation = useNavigation<NavigationProps>();
    const { prints, loading, fetchPrints } = usePrints();

    async function handleDataFromChild(item) {
        console.log("my favourite prints level", item);
        navigation.navigate("PrintedDesign", { print: item });
    }

    // useEffect(() => {
    //     fetchPrints();
    // }, []);

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
