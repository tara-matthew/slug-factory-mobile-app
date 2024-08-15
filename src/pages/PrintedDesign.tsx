import React from "react";
import {Text, View} from "react-native";

const PrintedDesign = (print) => {
    console.log(print.route.params.print.title)
    return (
        <View>
        <Text>{print.route.params.print.title}</Text>
        </View>
    )
}

export default PrintedDesign;
