import React, {memo} from "react";
import Welcome from "../components/template/Welcome";
import {Image, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const image = {uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg'};

const Login = () => {
    const navigation = useNavigation();

    return (
        <View className={"flex flex-1 justify-center items-center px-8 relative"}>
            {/*<Image className={"top-24 h-60 absolute w-full"} source={image}></Image>*/}
            <Welcome headerText={"Sign in to Slug Factory"} buttonText={"Sign In"} buttonTo={'Home'} inputs={[{placeholder: "email"}, {placeholder: "password"}]}></Welcome>
        </View>
    )
}

export default memo(Login);
