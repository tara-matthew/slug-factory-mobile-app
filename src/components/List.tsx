import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import Card from "./molecule/Card";

const List = ({ data }) => (
        <FlatList
            style={{marginBottom: 30}}
            data={data}
            horizontal={true}
            renderItem={({ item }) => <Card item={item} style={{marginRight: 10}} />}
            keyExtractor={(item) => item.id}
        />
);

export default List;
