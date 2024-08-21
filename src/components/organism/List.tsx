import React, {memo} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Card from "../molecule/Card";

const renderItem = ({ item }) => {
        return (
            <View className={"mr-4"}>
                <Card item={item} />
            </View>
        );
};

const List = ({ data }) => {
        console.log('list mounted');
        return (
                <FlatList
                    className={"mb-8"}
                    data={data}
                    initialNumToRender={5}
                    windowSize={10}
                    horizontal={true}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
        )
};

export default List;
