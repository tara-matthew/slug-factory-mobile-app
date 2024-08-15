import React, {useState} from 'react';
import {Image, Text, View} from "react-native";
import Form from "../organism/Form";


const Welcome = ({headerText, buttonText, inputs, buttonTo}) => {
    const [dataFromChild, setDataFromChild] = useState("");

    function handleDataFromChild(data) {
        setDataFromChild(data);
        console.log('this is the parent', data);
    }

    return (
        <View className={"w-full"}>
            <View className={"mb-10"}>
                <Text className={"text-xl font-bold text-center"}>{headerText}</Text>
            </View>
            <Form sendDataToParent={handleDataFromChild} buttonText={buttonText} buttonTo={buttonTo} inputs={inputs}></Form>
        </View>
    )
};

export default Welcome;
