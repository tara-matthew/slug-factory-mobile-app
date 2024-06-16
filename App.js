import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent} from 'react-native';
import List from "./src/components/List";
import GridItem from "./src/components/GridItem";

// const App = () => {
//     const [isLoading, setLoading] = useState(true);
//     const [data, setData] = useState([]);
//
//     const getPrints = async () => {
//         try {
//             const response = await fetch('http://192.168.0.15/api/prints');
//             const json = await response.json();
//             setData(json.data);
//             console.log(json.data);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         getPrints();
//     }, []);
//
//     return (
//         <View style={styles.container}>
//             <List data={data} />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//     },
// });

const App = () => {
    return (
        <View style={styles.container}>
            {/*<FlatList data={} renderItem={}*/}
            <GridItem></GridItem>
            <GridItem></GridItem>
            <GridItem></GridItem>
            <GridItem></GridItem>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
});

export default App;
