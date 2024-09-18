import React, { memo, useState } from "react";
import Welcome from "../components/template/Welcome";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

const image = { uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg' };

const Login = () => {
    const navigation = useNavigation();
    const [dataFromChild, setDataFromChild] = useState({});
    const [loginData, setLoginData] = useState<any>(null);
    const [error, setError] = useState("");
    // @ts-ignore
    const { onLogin } = useAuth();

    async function handleDataFromChild(formData) {
        // setDataFromChild(data);
        const result = await onLogin(formData.username, formData.password);
        if (result.error) {
            setError(result.msg);
        }
    }

    return (
        <View className={"flex flex-1 justify-center items-center px-8 relative"}>
            {error ? <Text className={"text-red-500 text-center mb-4"}>{error}</Text> : null}
            <Welcome sendDataToParent={handleDataFromChild} headerText={"Sign in to Slug Factory"} buttonText={"Sign In"} buttonTo={'Home'} inputs={[{ placeholder: "username" }, { placeholder: "password" }]}></Welcome>
        </View>
    )
}

export default memo(Login);
