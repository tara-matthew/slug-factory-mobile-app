import React, { memo } from "react";
import { Text, View } from "react-native";
import List from "../organism/List";

const ListGroup = ({ data }) => {
    return (
        <View>
            <Text className="mb-3 text-2xl">{data.heading}</Text>
            <List data={ data.data } />
        </View>
    );
};

export default memo(ListGroup);
