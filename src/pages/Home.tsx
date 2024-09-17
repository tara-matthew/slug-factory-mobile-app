import React, {memo, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import ListGroup from "../components/template/ListGroup";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const Home = () => {
    const baseURL = "https://wkz4a6zhju.sharedwithexpose.com/api"

    const [loadingLatest, setLoadingLatest] = useState(true);
    const [latestPrints, setLatestPrints] = useState([])
    const [popularPrints, setPopularPrints] = useState([])
    const [randomPrints, setRandomPrints] = useState([])
    const options = useMemo(() => ({
        method: 'GET'
    }), []);

    useEffect(() => {
        getHomeData()
    }, []);

    const getHomeData = () => {
        let endpoints = [
            `${baseURL}/prints/latest`,
            `${baseURL}/my/prints`,
            `${baseURL}/prints/random`,
        ];

        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            (
                [
                    {data: latestPrints},
                    {data: popularPrints},
                    {data: randomPrints}
                ]
            )=> {
            setLatestPrints(latestPrints.data)
            setPopularPrints(popularPrints.data)
            setRandomPrints(randomPrints.data)
        });
    }

    // if (loadingLatest) {
    //     return <Text>Loading...</Text>;
    // }

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
