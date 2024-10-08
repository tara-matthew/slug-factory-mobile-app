import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

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
                <View className="bg-black/5 w-full p-5 rounded-2xl mb-7" key={ index }>
                    <TextInput
                        placeholder={ field.placeholder }
                        value={ formValues[field.placeholder] }
                        onChangeText={ text => handleChange(field.placeholder, text) }
                    />
                </View>
            ))}
            <View className="w-full mt-4">
                <TouchableOpacity
                    style={ styles.button }
                    className="w-full p-3.5 rounded-2xl"
                    onPress={ handleSubmit }
                >
                    <Text className="text-center">{buttonText}</Text>

                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#d0cadb",
    },
});

export default Form;
