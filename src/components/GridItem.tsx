import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const GridItem = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Title</Text>
            <Text style={styles.text}>Description</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        flex: 1,
        // height: 20,
        backgroundColor: "#d0cadb",
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        shadowRadius: 2
    },
    text: {
       textAlign: "center"
    }
})

export default GridItem;
