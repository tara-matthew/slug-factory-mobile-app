import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Card from "../molecule/Card";

const List = ({ data }) => (
        <FlatList
            style={{marginBottom: 30}}
            data={data}
            horizontal={true}
            renderItem={({ item }) => <Card className={"mr-4"} item={item} />}
            keyExtractor={(item) => item.id}
        />
);

export default List;
