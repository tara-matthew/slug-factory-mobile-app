import React, { memo, useState } from "react";
import Welcome from "../components/template/Welcome";
import { View, Text } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";

const Login = () => {
    const [error, setError] = useState("");
    // @ts-ignore
    const { onLogin } = useAuth();
    const navigation = useNavigation();


    async function handleDataFromChild(formData) {
        // setDataFromChild(data);
        const result = await onLogin(formData.username, formData.password);
        console.log({result});
        if (result.error) {
            console.log('heree',result.error);

            setError(result.msg);
        }
    }

    return (
        <View className="flex flex-1 justify-center items-center px-8 relative">
            {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
            <Welcome sendDataToParent={ handleDataFromChild } headerText="Sign in to Slug Factory" buttonText="Sign In" buttonTo="Home" inputs={ [{ placeholder: "username", title: "Username", inputProps: {autoCapitalize: "none"} }, { placeholder: "password", title: "Password", inputProps: {secureTextEntry: true, autoCapitalize: "none"} }] }></Welcome>
        </View>
    );
};

export default memo(Login);
