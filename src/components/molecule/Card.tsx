import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Card = ({item, style}) => {
    const width = 300;
    const height = 200;

    return (
        <View style={[style, styles.container]}>
            <View style={styles.imageContainer}>
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
    text: {
       textAlign: "center"
    },
    imageContainer: {
        position: "relative"
    },
    icon: {
        position: 'absolute',
        top: 5,
        right: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3
        // opacity: 5
        // backgroundColor: 'rgba(0, 0, 0, 0.5)'
        // backgroundColor: 'red',
    }
})

export default Card;
