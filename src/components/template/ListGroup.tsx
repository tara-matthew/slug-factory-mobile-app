import React, {memo} from "react";
import useFetch from "../../hooks/useFetch";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import List from "../organism/List";

const ListGroup = ({data}) => {
    return (
        <View>
            <Text className={"mb-3 text-2xl"}>{data.heading}</Text>
            <List data={data.data}/>
        </View>
    );
};

export default memo(ListGroup);
