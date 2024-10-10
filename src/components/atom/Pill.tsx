import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { IPillProps } from "../../contracts/Pill";

const Pill = ({ title }: IPillProps) => {
    return (
        <TouchableOpacity
            className="bg-white p-3.5 rounded-2xl"
        >
            <Text className="text-center text-black">{title}</Text>

        </TouchableOpacity>
    );
};

export default Pill;
