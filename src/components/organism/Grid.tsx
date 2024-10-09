import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../molecule/Card";

const Grid = (props) => {
    useEffect(() => {
        console.log(props.prints);
    }, []);
    const renderItem = ({ item }) => {
        return (
            <Card item={ item } />
        );
    };
    return (
        <FlatList
            className="mb-8"
            // style={styles.container}
            contentContainerStyle={ styles.grid }
            columnWrapperStyle={ { justifyContent: "space-between", gap: 20 } }
            data={ props.prints }
            numColumns={ 2 }
            initialNumToRender={ 5 }
            renderItem={ renderItem }
            keyExtractor={ item => item.id }
        />
    );
};

const styles = StyleSheet.create({
    grid: {
        padding: 20,
    },
    card: {
        marginRight: 20,
    },
});

export default Grid;
