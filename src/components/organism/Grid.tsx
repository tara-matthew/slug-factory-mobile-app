import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../molecule/Card";
import {IPrint} from "../../contracts/Print";
import { IGridProps } from "../../contracts/Grid";

const Grid = ({ prints }: IGridProps) => {
    const renderItem = ({ item }) => {
        return (
            <Card item={item} image={item.images[0]} />
        );
    };
    return (
        <FlatList
            className="mb-8"
            contentContainerStyle={ styles.grid }
            columnWrapperStyle={ { justifyContent: "space-between", gap: 20 } }
            data={prints }
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
