import React, { memo, useState } from "react";
import Welcome from "../components/template/Welcome";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { RegisterNavigationProps } from "../contracts/Navigator";

const Login = () => {
    // TODO could move TouchableOpacity into Welcome template
    const [error, setError] = useState("");
    const { onLogin } = useAuth();
    const navigation = useNavigation<RegisterNavigationProps>();

    async function handleDataFromChild(formData) {
        const result = await onLogin(formData.username, formData.password);
        if ("error" in result && result.error) {
            setError(result.msg);
        }
    }

    return (
        <View className="flex flex-1 items-center px-8 py-52 relative">
            <View className="w-full mb-6">

                {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
                <Welcome
                    sendDataToParent={ handleDataFromChild }
                    headerText="Sign in to Slug Factory"
                    buttonText="Sign In"
                    inputs={ [
                        { placeholder: "username", title: "Username", isMultiline: false, inputProps: { autoCapitalize: "none", autoCorrect: false, textContentType: "oneTimeCode" } },
                        { placeholder: "password", title: "Password", isMultiline: false, inputProps: { secureTextEntry: true, autoCapitalize: "none" } },
                    ] }
                >
                </Welcome>
            </View>
            <TouchableOpacity onPress={ () => navigation.navigate("Register") }>
                <Text className="font-bold text-md">Don't have an account yet?</Text>
            </TouchableOpacity>

        </View>
    );
};

export default memo(Login);
