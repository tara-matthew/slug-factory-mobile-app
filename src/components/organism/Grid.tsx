import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../molecule/Card";

const Grid = (props) => {
    useEffect(() => {
        console.log(props.prints);
    }, []);
    const renderItem = ({ item }) => {
        return (
            // <View style={{marginRight: 10}}>
            <Card item={ item } />
            // </View>
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
    container: {
        // gap: 20
    },
    cardContainer: {
        // gap: 20,
        // flex: 1, // Allows the Card to take up available space
        // marginRight: 10, // Or you could use padding in the grid
        // marginBottom: 20,
    },
    card: {
        marginRight: 20,
    },
});

export default Grid;
