import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent, Image} from 'react-native';
import List from "./src/components/List";
import GridItem from "./src/components/GridItem";
import useFetch from "./src/hooks/useFetch";

const App = () => {
    const url = "prints";
    const { data, loading, error } = useFetch(url);

    if (data && !loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Recently Added</Text>
                <List data={data}/>
                <Text style={styles.text}>Most Popular</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
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
