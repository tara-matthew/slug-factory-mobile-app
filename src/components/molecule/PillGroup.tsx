import React from 'react';
import Pill from "../atom/Pill";
import {StyleSheet, View} from "react-native";

const PillGroup = ({pills}) => {
    return (
        <View className={"flex flex-row flex-wrap mb-9"} style={styles.container}>
            {pills.map((pill, index) => (
                <Pill key={index} title={pill.title} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        rowGap: 16,
        columnGap: 12
    },
})

export default PillGroup;
