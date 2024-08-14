import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent, Image, ScrollView} from 'react-native';
import List from "./src/components/List";
import Card from "./src/components/molecule/Card";
import useFetch from "./src/hooks/useFetch";
import { Ionicons } from '@expo/vector-icons';
import "./global.css"

const App = () => {
    const {
        data: latestPrints,
        loading: loadingLatest,
        error: errorLatest,
    } = useFetch('prints/latest');

    const {
        data: popularPrints,
        loading: loadingPopular,
        error: errorPopular
    } = useFetch('my/prints'); // todo route alias

    const {
        data: randomPrints,
        loading: loadingRandom,
        error: errorRandom
    } = useFetch('prints/random');

    if (loadingLatest || loadingPopular || loadingRandom) {
        return <Text>Loading...</Text>;
    }

        return (
            <View style={styles.outerContainer}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Ionicons style={{position: 'absolute', top: 60, right: 20}} name="notifications-outline" size={26} color="black" />
                    <Text style={styles.text}>Recently Added</Text>
                    <List data={latestPrints}/>
                    <Text style={styles.text}>Most Popular</Text>
                    <List data={popularPrints}/>
                    <Text style={styles.text}>Last Viewed</Text>
                    <List data={randomPrints}/>
                </ScrollView>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 100,
        paddingHorizontal: 20
    },
    outerContainer: {
      position: 'relative'
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default App;
