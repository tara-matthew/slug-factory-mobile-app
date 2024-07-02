import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent, Image} from 'react-native';
import List from "./src/components/List";
import GridItem from "./src/components/GridItem";

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPrints = async () => {
        try {
            const response = await fetch('http://192.168.0.15/api/prints');
            const json = await response.json();
            setData(json.data);
            console.log(json.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPrints().then(response => console.log(response));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Recently Added</Text>
            <List data={data}/>
            <Text style={styles.text}>Most Popular</Text>
        </View>
    );
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
