import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent, Image, ScrollView} from 'react-native';
import List from "./src/components/List";
import GridItem from "./src/components/GridItem";
import useFetch from "./src/hooks/useFetch";

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
    } = useFetch('prints');

    if (loadingLatest || loadingPopular) {
        return <Text>Loading...</Text>;
    }

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Recently Added</Text>
                <List data={latestPrints}/>
                <Text style={styles.text}>Most Popular</Text>
                <List data={popularPrints}/>

            </ScrollView>
        );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    }
});

// const App = () => {
//     return (
//         <View style={styles.container}>
//             {/*<FlatList data={} renderItem={}*/}
//             <GridItem></GridItem>
//             <GridItem></GridItem>
//             <GridItem></GridItem>
//             <GridItem></GridItem>
//         </View>
//     )
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         paddingTop: 50,
//     },
// });

export default App;
