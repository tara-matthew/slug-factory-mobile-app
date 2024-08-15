import React, {memo, useEffect} from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";


const Card = ({item, className}) => {
    const width = 300;
    const height = 200;

    const navigation = useNavigation();

    const buttonPressed = (item) => {
        console.log('pressed', item.title);
        navigation.navigate('PrintedDesign', {print: item})

    }

    return (
        <View className={className} style={[styles.container]}>
            <Pressable
                onPress={() => buttonPressed(item)}>
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
            </Pressable>
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
