import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "../molecule/Card";
import {IListProps} from "../../contracts/List";

const List = ({ data, sendDataToParent }: IListProps) => {
    const renderItem = ({ item }) => {
        return (
            <View className="mr-4" style={ [styles.container] }>
                <Card
                    item={ item }
                    imageURL={ item?.images?.[0].url ?? item.image_url }
                    blurhash={ item?.images?.[0].blurhash }
                    sendDataToParent={ handleDataFromChild }
                />
            </View>
        );
    };

    function handleDataFromChild(data: never) {
        sendDataToParent(data);
    }

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
