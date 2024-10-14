import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "../molecule/Card";

const renderItem = ({ item }) => {
    return (
        <View className="mr-4" style={ [styles.container] }>
            <Card item={ item } image={ item.images[0] } />
        </View>
    );
};

const List = ({ data }) => {
    console.log("list mounted");
    return (
        <FlatList
            className="mb-8"
            data={ data }
            initialNumToRender={ 5 }
            windowSize={ 10 }
            horizontal={ true }
            renderItem={ renderItem }
            keyExtractor={ item => item.id }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        // height: 250,
        // flex: 1,
        // backgroundColor: "#d0cadb",
        // marginBottom: 20,
        // shadowRadius: 2,
    },
});

export default List;
