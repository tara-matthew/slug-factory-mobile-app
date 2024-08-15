import React, {memo, useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Card = ({item, className}) => {
    const width = 300;
    const height = 200;
    // console.log('Card component rendered'); // Log to check re-renders
    useEffect(() => {
        console.log('Card component mounted or updated', item.id);
    }, [item]); // Dependencies array: re-run effect when `item` changes

    return (
        <View className={className} style={[styles.container]}>
            <View className={"relative"}>
            <Image
                style={{
                    width: width,
                    height: height,
                }}
                source={{
                    uri: item.images[0]?.url,
                }}
            />
                <MaterialIcons
                    name="favorite-outline"
                    size={32}
                    color="white"
                    style={styles.icon}
                    className={"absolute top-1 right-2"}
                />

            <Text style={{height: 50, fontSize: 18, padding: 8}}>{item.title}</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        // height: 250,
        flex: 1,
        backgroundColor: "#d0cadb",
        marginBottom: 20,
        shadowRadius: 2
    },
    icon: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3
        // opacity: 5
        // backgroundColor: 'rgba(0, 0, 0, 0.5)'
        // backgroundColor: 'red',
    }
})

export default memo(Card);
