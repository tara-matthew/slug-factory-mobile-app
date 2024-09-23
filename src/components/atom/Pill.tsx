import React from "react";
import { Text, TouchableOpacity } from "react-native";

type PillProps = {
    title: string;
};

const Pill = (props: PillProps) => {
    return (
        <TouchableOpacity
            className="bg-white p-3.5 rounded-2xl"
        >
            <Text className="text-center text-black">{props.title}</Text>

        </TouchableOpacity>
    );
};

export default Pill;
