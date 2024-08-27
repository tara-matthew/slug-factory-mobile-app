import React, {useState} from "react";
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, Button, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';

const Thingiverse = () => {

    const source = {
        html: `
<p style='text-align:center;'>
  Hello World!
</p>`
    };

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1.3333,
                }}
                       source={{
                           uri: 'https://picsum.photos/640/480?random=40225',
                       }} />

                <RenderHtml
                    contentWidth={100}
                    source={source}
                />

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    view: {
        // paddingVertical: 50,
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#DFE4EA'
    }
});

export default Thingiverse;
