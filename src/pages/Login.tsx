import React, {memo, useState} from "react";
import Welcome from "../components/template/Welcome";
import {Image, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

const image = {uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg'};

const Login = () => {
    const navigation = useNavigation();
    const [dataFromChild, setDataFromChild] = useState({});
    const [error, setError] = useState("");

    async function handleDataFromChild(data) {
        // setDataFromChild(data);
        console.log('this is the parent', data);
        try {
            await login(data)
            // console.log('here');
            navigation.navigate('Home' as never) // todo use proper types
        } catch (e) {
            console.log(e)
            setError(e);
        }
    }

    const login = async (data) => {
        // Simulate an API call
        if (data.email === "test") {
            return Promise.resolve("Login successful");
        } else {
            return Promise.reject("Invalid username or password");
        }
    };

    return (
        <View className={"flex flex-1 justify-center items-center px-8 relative"}>
            {error ? <Text className={"text-red-500 text-center mb-4"}>{error}</Text> : null}
            <Welcome sendDataToParent={handleDataFromChild} headerText={"Sign in to Slug Factory"} buttonText={"Sign In"} buttonTo={'Home'} inputs={[{placeholder: "email"}, {placeholder: "password"}]}></Welcome>
        </View>
    )
}

export default memo(Login);
