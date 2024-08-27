import React from 'react';
import Pill from "../atom/Pill";
import {View} from "react-native";

const PillGroup = ({pills}) => {
    return (
        <View className={"flex flex-row flex-wrap gap-y-4 gap-x-3 mb-9"}>
            {pills.map((pill, index) => (
                <Pill key={index} title={pill.title} />
            ))}
        </View>
    )
}

export default PillGroup;
