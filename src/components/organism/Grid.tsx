import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../molecule/Card";
import { IGridProps } from "../../contracts/Grid";

const Grid = ({ items, sendDataToParent }: IGridProps) => {
    function handleDataFromChild(data: never) {
        sendDataToParent(data);
    }

    const renderItem = ({ item }) => {
        return (
            <Card
                sendDataToParent={ handleDataFromChild }
                item={ item }
                blurhash={ item?.images?.[0].blurhash }
                imageURL={ item?.images?.[0]?.url ?? item.image_url }
            />
        );
    };
    return (
        <FlatList
            className="mb-8"
            contentContainerStyle={ styles.grid }
            columnWrapperStyle={ { justifyContent: "space-between", gap: 20 } }
            data={ items }
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
