import React from 'react';
import {Image, View} from "react-native";
import Form from "../organism/Form";

const image = {uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg'};

const Welcome = () => {
    return (
        <View className={"flex flex-1 justify-center items-center px-8 relative"}>
            <Image className={"top-24 h-60 absolute w-full opacity-1"} source={image}></Image>

            <Form headerText={"Sign in to Slug Factory"} buttonText={"Sign In"} inputs={[{placeholder: "Email"}, {placeholder: "Password"}]}></Form>
        </View>
    )
}

export default Welcome;
