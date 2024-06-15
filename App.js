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

import React from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent} from 'react-native';
import List from "./src/components/List";

const data = [
    {key: 'Devin'},
    {key: 'Dan'},
    {key: 'Dominic'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
    // ...
    // ...
];

const App = () => {
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
