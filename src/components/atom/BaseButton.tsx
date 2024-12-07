import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { IButtonProps } from "../../contracts/Button";

const BaseButton = ({ title, sendDataToParent }: IButtonProps) => {
    return (
        <TouchableOpacity
            style={ { backgroundColor: "#d0cadb" } }
            className="w-full p-3.5 rounded-2xl"
            onPress={ sendDataToParent }
        >
            <Text className="text-center">{title}</Text>
        </TouchableOpacity>
    );
};

export default BaseButton;
