import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";

const StorePrint = () => {
    const [formValues, setFormValues] = useState(null);
    const [checked, setChecked] = React.useState("first");
    const [value, setValue] = React.useState("first");

    const handleChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues.title);
    };

    const handleSubmit = async () => {
        console.log("submitting", formValues);
    };

    useEffect(() => {
        console.log(value)
    }, [value]);

    const getBackgroundColorStyle = (value, matchValue) => {
        return value === matchValue ? { backgroundColor: "#d2d1d3" } : {};
    };

    // @ts-ignore
    return (
        <View>
            <View className="p-5">
                <Text>Title</Text>
                <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                <TextInput
                    placeholder={ "title" }
                    onChangeText={ text => handleChange("title", text) }
                />
                </View>
                <Text>Material</Text>
                <RadioButton.Group onValueChange={ newValue => setValue(newValue) } value={ value }>
                    <RadioButton.Item
                        value="pla"
                        label="PLA"
                        style={{
                            ...getBackgroundColorStyle(value, "pla"),
                            // paddingLeft: 0
                        }}
                    />
                    <RadioButton.Item
                        value="petg"
                        label="PETG"
                        style={{
                            ...getBackgroundColorStyle(value, "petg"),
                            // paddingLeft: 0
                        }}
                    />
                </RadioButton.Group>

                <View className="w-full mt-4">
                    <TouchableOpacity
                        style={ { backgroundColor: "#d0cadb" } }
                        className="w-full p-3.5 rounded-2xl"
                        onPress={ handleSubmit }
                    >
                        <Text className="text-center">Submit</Text>

                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default StorePrint;
