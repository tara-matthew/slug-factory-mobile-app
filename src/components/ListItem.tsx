import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ListItem = ({ item }) => {
    return (
        <Text style={styles.item}>{item.title}</Text>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        width: '100%',
        textAlign: 'center',
        alignSelf: "center",
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default ListItem;
