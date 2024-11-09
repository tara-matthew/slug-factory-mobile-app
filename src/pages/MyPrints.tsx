import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import fetchData from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import { useNavigation } from "@react-navigation/native";
import { PrintedDesignNavigationProps } from "../contracts/Navigator";

const MyPrints = () => {
    const [loading, setLoading] = useState(true);
    const [prints, setPrints] = useState([]);
    const navigation = useNavigation<PrintedDesignNavigationProps>();

    useEffect(() => {
        void getPrints();
    }, []);

    async function handleDataFromChild(item) {
        console.log("my print level", item);
        navigation.navigate("PrintedDesign", { print: item });
    }

    const getPrints = async () => {
        try {
            const prints = await fetchData("/my/prints");
            setPrints(prints.data);
        } catch (error) {
            console.error("Error in getting prints", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    return (
        <View>
            <Grid items={ prints } sendDataToParent={ handleDataFromChild }></Grid>
        </View>
    );
};

export default MyPrints;
