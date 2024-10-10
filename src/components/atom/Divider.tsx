import React from "react";
import { StyleSheet, View } from "react-native";
import { DividerWidth, IDividerProps } from "../../contracts/Divider";

const Divider = (props: IDividerProps) => {
    const dividerClass = props.width === DividerWidth.Half ? "w-1/2" : "w-full";
    return (
        <View className={ dividerClass } style={ styles.divider } />
    );
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: "gray",
    },
});

export default Divider;
