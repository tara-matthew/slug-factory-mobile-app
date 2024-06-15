// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import ListItem from "./src/components/ListItem";
// import List from "./src/components/List";
//
// export default function App() {
//   return (
//       <View style={styles.container}>
//         <List></List>
//       </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // flexDirection: "column-reverse"
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });

import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent} from 'react-native';
import List from "./src/components/List";

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
        getPrints();
    }, []);

    return (
        <View style={styles.container}>
            <List data={data} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
});

export default App;
