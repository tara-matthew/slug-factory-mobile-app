import React from 'react';
import {StyleSheet, View} from "react-native";

const Divider = (props) => {
    const dividerClass = props.width === 'half' ? 'w-1/2': 'w-full';
    return (
        <View className={dividerClass} style={ styles.divider } />
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: "gray",
    },
});

export default Divider;
