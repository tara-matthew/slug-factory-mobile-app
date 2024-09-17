import React, {memo, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import ListGroup from "../components/template/ListGroup";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import fetchData from "../hooks/apiFetch";

const Home = () => {
    const baseURL = "https://wkz4a6zhju.sharedwithexpose.com/api"

    const [loading, setLoading] = useState(true);
    const [latestPrints, setLatestPrints] = useState([])
    const [popularPrints, setPopularPrints] = useState([])
    const [randomPrints, setRandomPrints] = useState([])

    useEffect(() => {
        getHomeData()
    }, []);

    const getHomeData = async () => {
        let endpoints = [
            `${baseURL}/prints/latest`,
            `${baseURL}/my/prints`,
            `${baseURL}/prints/random`,
        ];

        try {
            const [latestPrints, popularPrints, randomPrints] = await fetchData(endpoints);
            setLatestPrints(latestPrints);
            setPopularPrints(popularPrints);
            setRandomPrints(randomPrints);
        } catch (error) {
            console.error("Error in getHomeData", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View className={"relative"}>
            <ScrollView contentContainerStyle={styles.container}>
               <ListGroup data={{heading: "Recently Uploaded", data: latestPrints}}></ListGroup>
               <ListGroup data={{heading: "Most Popular", data: popularPrints}}></ListGroup>
               <ListGroup data={{heading: "Last Viewed", data: randomPrints}}></ListGroup>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default memo(Home);
