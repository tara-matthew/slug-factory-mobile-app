import React, { memo, useState } from "react";
import Welcome from "../components/template/Welcome";
import { View, Text, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { LoginNavigationProps } from "../contracts/Navigator";

const Register = () => {
    const [error, setError] = useState("");
    const { onLogin, onRegister } = useAuth();
    const navigation = useNavigation<LoginNavigationProps>();

    const inputs
        = [
            {
                placeholder: "name", title: "Name", inputProps: {},
            },
            {
                placeholder: "email", title: "Email", inputProps: { keyboardType: "email-address", autoCapitalize: "none" },
            },
            {
                placeholder: "username", title: "Username", inputProps: { autoCapitalize: "none" },
            },
            {
                placeholder: "password", title: "Password", inputProps: { secureTextEntry: false, autoCapitalize: "none" },
            },
        ];

    async function handleDataFromChild(formData) {
        const result = await onRegister(
            formData.name,
            formData.email,
            formData.username,
            formData.password,
            formData.password_confirmation);
        if (result?.error) {
            console.log(result.error);
        } else {
            await onLogin(formData.username, formData.password);
        }
    }

    return (
        <View className="flex flex-1 justify-center items-center px-8 relative">
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={ 15 } className="w-full mb-6">

                {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
                <Welcome sendDataToParent={ handleDataFromChild } headerText="Register for Slug Factory" buttonText="Register" buttonTo="Home" inputs={ inputs }></Welcome>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={ () => navigation.navigate("Login") }>
                <Text className="font-bold text-md">Already have an account?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default memo(Register);
