import React, { memo } from "react";
import { View, Text } from "react-native";

const Card2 = memo(
    ({ item }: { item: any }) => (
        <View>
            <Text style={ { height: 50, fontSize: 18, padding: 8 } }>{item.title}</Text>
        </View>
    ),
    (prevProps, nextProps) => {
        return prevProps.item.title === nextProps.item.title;
    },
);

export default Card2;
