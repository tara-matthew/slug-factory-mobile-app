import React, {memo} from "react";
import useFetch from "../../hooks/useFetch";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import List from "../organism/List";

const ListGroup = ({data}) => {
    return (
        <View>
            <Text style={styles.text}>{data.heading}</Text>
            <List data={data.data}/>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default memo(ListGroup);
