import React, { useState } from "react";
import { View } from "react-native";
import BaseButton from "../atom/BaseButton";
import InputGroup from "../molecule/InputGroup";
import {IFormProps} from "../../contracts/Form";

const Form = ({ inputs, buttonText, buttonTo, sendDataToParent }: IFormProps) => {
    const [formValues, setFormValues] = useState(
        inputs.reduce((acc, field) => ({ ...acc, [field.placeholder]: "" }), {}),
    );

    const handleSubmit = async () => {
        sendDataToParent(formValues);
    };

    const handleChange = (name: string, value: string) => {
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <View className="w-full">
            <InputGroup inputs={ inputs } sendDataToParent={ handleChange }></InputGroup>
            <View className="w-full mt-4">
                <BaseButton title={ buttonText } sendDataToParent={ handleSubmit }></BaseButton>
            </View>
        </View>
    );
};

export default Form;
