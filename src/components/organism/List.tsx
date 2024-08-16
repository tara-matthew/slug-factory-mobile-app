import React, {memo} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Card from "../molecule/Card";

// const renderItem = ({ item }) => <Card className={"mr-4"} item={item} />;

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
                    style={{marginBottom: 30}}
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
