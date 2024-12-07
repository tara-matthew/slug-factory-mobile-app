import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import BaseButton from "../atom/BaseButton";
import InputWithLabel from "../molecule/InputWithLabel";
import {TitleSize} from "../../contracts/InputWithLabel";

const Form = ({ inputs, buttonText, buttonTo, sendDataToParent = null }) => {
    const [formValues, setFormValues] = useState(
        inputs.reduce((acc, field) => ({ ...acc, [field.placeholder]: "" }), {}),
    );

    const handleSubmit = async () => {
        sendDataToParent(formValues);
    };

    const handleChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <View className="w-full">
            {inputs.map((field, index) => (
                <View key={ index }>
                    <InputWithLabel
                        title={ field.title}
                        titleSize={TitleSize.Medium}
                        inputProps={{ ...field.inputProps }}
                        value={ formValues[field.placeholder] }
                        placeholder={field.placeholder}
                        isMultiline={false}
                        sendDataToParent={handleChange}>

                    </InputWithLabel>
                </View>
            ))}
            <View className="w-full mt-4">
                <BaseButton title={buttonText} sendDataToParent={handleSubmit}></BaseButton>
            </View>
        </View>
    );
};

export default Form;
