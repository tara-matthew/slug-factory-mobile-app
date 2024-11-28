import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const LoadingSpinner = () => {
    return (
        <View
            className="absolute top-0 left-0 right-0 bottom-0 justify-center bg-white z-10"
        >
            <ActivityIndicator size="large" color="#0000ff" animating={ true } />
        </View>
    );
};

export default LoadingSpinner;
