import React, {memo, useMemo, useState} from "react";
import Welcome from "../components/template/Welcome";
import {Image, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = {uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg'};

const Login = () => {
    const navigation = useNavigation();
    const [dataFromChild, setDataFromChild] = useState({});
    const [loginData, setLoginData] = useState<any>(null);
    const [error, setError] = useState("");

    async function handleDataFromChild(formData) {
        // setDataFromChild(data);
        // TODO move into a login function and call that here
        try {
            const response = await axios.post('http://y5od4x98yo.sharedwithexpose.com/api/auth/login', {
                username: formData.username,
                password: formData.password,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            // Persist token into storage
            const token = response.data.data.token;
            // console.log(token);
            await AsyncStorage.setItem("token", token);
            const storedToken = await AsyncStorage.getItem("token")
            console.log(storedToken)
            // navigation.navigate('Home');

        } catch (err) {
            const error = err.response.data.errors ?? err.response.data.message
            console.log(err.response.data.message);
            setError(err.response.data.message)
        }
    }

    return (
        <View className={"flex flex-1 justify-center items-center px-8 relative"}>
            {error ? <Text className={"text-red-500 text-center mb-4"}>{error}</Text> : null}
            <Welcome sendDataToParent={handleDataFromChild} headerText={"Sign in to Slug Factory"} buttonText={"Sign In"} buttonTo={'Home'} inputs={[{placeholder: "username"}, {placeholder: "password"}]}></Welcome>
        </View>
    )
}

export default memo(Login);
