import React, { memo, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ListGroup from "../components/template/ListGroup";
import fetchData from "../hooks/apiFetch";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [prints, setPrints] = useState({
        latest: [],
        popular: [],
        random: [],
    });

    useEffect(() => {
        void getHomeData();
    }, []);

    const getHomeData = async () => {
        const endpoints = [
            `/prints/latest`,
            `/my/prints`,
            `/prints/random`,
        ];

        try {
            const [latestPrints, popularPrints, randomPrints] = await fetchData(endpoints);
            setPrints({
                latest: latestPrints.data,
                popular: randomPrints.data,
                random: randomPrints.data,
            });
        } catch (error) {
            console.error("Error in getHomeData", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    return (
        <View className="relative">
            <ScrollView contentContainerStyle={ styles.container }>
                <ListGroup data={ { heading: "Recently Uploaded", data: prints.latest } }></ListGroup>
                <ListGroup data={ { heading: "Most Popular", data: prints.popular } }></ListGroup>
                <ListGroup data={ { heading: "Last Viewed", data: prints.random } }></ListGroup>
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
