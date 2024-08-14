import React from "react";
import {View, TextInput, TouchableOpacity, Text, ImageBackground, Image} from "react-native";

const image = {uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg'};

const Form = ({headerText, inputs, buttonText }) => {
    return (
    <View className={"flex flex-1 justify-center items-center px-8 relative"}>
        <Image className={"top-24 h-60 absolute w-full opacity-1"} source={image}></Image>
        <View className={"mb-10"}>
            <Text className={"text-xl font-bold"}>{headerText}</Text>
        </View>
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
