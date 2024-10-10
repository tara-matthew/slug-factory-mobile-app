import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { IPillProps } from "../../contracts/Pill";

const Pill = (props: IPillProps) => {
    return (
        <TouchableOpacity
            className="bg-white p-3.5 rounded-2xl"
        >
            <Text className="text-center text-black">{props.title}</Text>

        </TouchableOpacity>
    );
};

export default Pill;
