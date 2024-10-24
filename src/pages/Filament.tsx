import React from "react";
import {Text} from "react-native";

const Filament = ({route}) => {
    const { filament } = route.params;

    return (
        <Text>{filament.title}</Text>
    );
}

export default Filament;
