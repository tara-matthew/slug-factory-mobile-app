import React from "react";
import {View, TextInput, TouchableOpacity, Text, ImageBackground, Image} from "react-native";

const image = {uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg'};

const Form = () => {
    return (
    <View className={"flex flex-1 justify-center items-center px-8"}>
        <Image className={"h-full absolute w-full opacity-1"} source={image}></Image>
        <View className={"mb-10"}>
            <Text className={"text-xl font-bold"}>Sign in to Slug Factory</Text>
        </View>
        <View className={"bg-black/5 w-full p-5 rounded-2xl mb-7"}>
            <TextInput placeholder='Email'></TextInput>
        </View>
        <View className={"bg-black/10 w-full p-5 rounded-2xl mb-9"}>
            <TextInput className={"opacity-1"} placeholder='Password'></TextInput>
        </View>
        <View className={"w-full"}>
            <TouchableOpacity
                className={"w-full bg-purple-500 p-3.5 rounded-2xl"}
            >
                <Text className={"text-center text-white"}>Sign In</Text>

            </TouchableOpacity>

        </View>
    </View>
    )
}

export default Form;
