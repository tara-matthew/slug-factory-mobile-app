import React, { memo } from "react";
import { Text, View } from "react-native";
import List from "../organism/List";
import { IListGroupProps } from "../../contracts/List";

const ListGroup = ({ heading, data, sendDataToParent }: IListGroupProps) => {
    function handleDataFromChild(data: never) {
        sendDataToParent(data);
    }

    return (
        <View>
            <Text className="mb-3 text-2xl">{ heading }</Text>
            <List data={ data } sendDataToParent={ handleDataFromChild } />
        </View>
    );
};

export default memo(ListGroup);
