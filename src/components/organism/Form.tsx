import React from "react";
import {View, TextInput, TouchableOpacity, Text, ImageBackground, Image} from "react-native";


const Form = ({inputs, buttonText }) => {
    return (
    <View className={"w-full"}>
        {inputs.map((field, index) => (
            <View className={"bg-black/5 w-full p-5 rounded-2xl mb-7"} key={index}>
                <TextInput placeholder={field.placeholder} />
            </View>
        ))}
        <View className={"w-full mt-4"}>
            <TouchableOpacity
                className={"w-full bg-purple-500 p-3.5 rounded-2xl"}
            >
                <Text className={"text-center text-white"}>{buttonText}</Text>

            </TouchableOpacity>

        </View>
    </View>
    )
}

export default Form;
