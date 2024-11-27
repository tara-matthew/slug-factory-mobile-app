import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const LoadingSpinner = () => {
    return (
        <View
            style={ styles.spinner }
        >
            <ActivityIndicator size="large" color="#0000ff" animating={ true } />
        </View>
    );
};

const styles = StyleSheet.create({
    spinner: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: 1,
    },
});

export default LoadingSpinner;
