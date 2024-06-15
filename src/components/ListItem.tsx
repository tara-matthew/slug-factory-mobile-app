import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ListItem = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text>Hello world</Text>
                <Text>Helloooo</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default ListItem
