import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const List = ({ data }) => (
        <FlatList
            data={data}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(item) => item.id}
        />
);

export default List;
