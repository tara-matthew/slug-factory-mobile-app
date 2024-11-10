import React, { memo, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ListGroup from "../components/template/ListGroup";
import fetchData from "../hooks/apiFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import {usePrints} from "../contexts/PrintsContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [prints, setPrints] = useState({
        latest: [],
        popular: [],
        random: [],
    });
    const {latestPrints} = usePrints()
    const navigation = useNavigation<NavigationProps>();
    // console.log(latestPrints);
    // console.log(prints.latest[0].is_favourite);

    async function handleDataFromChild(item) {
        console.log("Home level", item);
        navigation.navigate("PrintedDesign", { print: item });
    }

    useEffect(() => {
        // void getHomeData(); // TODO separate out concerns, perform api call in a hook so this screen focuses on data presentation
        console.log("Updated latestPrints in Home:", latestPrints);
    }, [latestPrints]);

    const getHomeData = async () => {
        const endpoints = [
            `/prints/latest`,
            `/my/prints`,
            `/prints/random`,
        ];

        try {
            const [latestPrints, popularPrints, randomPrints] = await fetchData(endpoints);
            console.log(latestPrints.data[0].is_favourite)
            setPrints({
                latest: latestPrints.data,
                popular: popularPrints.data,
                random: randomPrints.data,
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

    // if (loading) {
    //     return (<Text>Loading...</Text>);
    // }

    return (
        <View className="relative">
            <ScrollView contentContainerStyle={ styles.container }>
                <ListGroup sendDataToParent={ handleDataFromChild } heading="Recently Uploaded" data={ latestPrints.data }></ListGroup>
                {/*<ListGroup sendDataToParent={ handleDataFromChild } heading="Most Popular" data={ prints.popular }></ListGroup>*/}
                {/*<ListGroup sendDataToParent={ handleDataFromChild } heading="Last Viewed" data={ prints.random }></ListGroup>*/}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default memo(Home);
