import React, {useState} from "react";
import {View, TextInput, TouchableOpacity, Text, ImageBackground, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Home from "../../pages/Home";
import login from "../../pages/Login";


const Form = ({inputs, buttonText, buttonTo, sendDataToParent=null }) => {
    const [formValues, setFormValues] = useState(
        inputs.reduce((acc, field) => ({ ...acc, [field.placeholder]: "" }), {})
    );

    const handleSubmit = async () => {
        sendDataToParent(formValues);
    }

    const handleChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    return (
    <View className={"w-full"}>
        {inputs.map((field, index) => (
            <View className={"bg-black/5 w-full p-5 rounded-2xl mb-7"} key={index}>
                <TextInput placeholder={field.placeholder}
                           value={formValues[field.placeholder]}
                           onChangeText={(text) => handleChange(field.placeholder, text)}
                />
            </View>
        ))}
        <View className={"w-full mt-4"}>
            <TouchableOpacity
                className={"w-full bg-purple-500 p-3.5 rounded-2xl"}
                onPress={handleSubmit}
            >
                <Text className={"text-center text-white"}>{buttonText}</Text>

            </TouchableOpacity>

        </View>
    </View>
    )
}

export default Form;
