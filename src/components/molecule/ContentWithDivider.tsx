import React from 'react';
import {StyleSheet, View, Text} from "react-native";

type ContentWithDivider = {
    top: boolean;
    bottom: boolean;
    text: string;
    class: string;
}
const ContentWithDivider = (props: ContentWithDivider) => {
    return (
        <View className={props.class}>
            {props.top && <View style={styles.divider} />}
            <Text className="text-lg py-2">{props.text}</Text>
            {props.bottom && <View style={styles.divider} />}
        </View>
    )
}
// todo try 100% width view?

const styles = StyleSheet.create( {
    divider: {
        width: '50%',
        height: .5,
        backgroundColor: 'gray'
    }
})

export default ContentWithDivider;

