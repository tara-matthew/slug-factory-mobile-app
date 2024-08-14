import React from 'react';
import {Image, Text, View} from "react-native";
import Form from "../organism/Form";


const Welcome = ({headerText, buttonText, inputs}) => {
    return (
        <View className={"w-full"}>
            <View className={"mb-10"}>
                <Text className={"text-xl font-bold text-center"}>{headerText}</Text>
            </View>
            <Form buttonText={buttonText} inputs={inputs}></Form>
        </View>
    )
}

export default Welcome;
