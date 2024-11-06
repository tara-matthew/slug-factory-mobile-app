import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";

const StorePrint = () => {
    const [formValues, setFormValues] = useState({ adhesion: "skirt", material: "pla", uses_supports: false });
    const [checked, setChecked] = React.useState("first");
    const [value, setValue] = React.useState("first");

    const handleChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
        // console.log(formValues.title);
    };

    const handleSubmit = async () => {
        console.log("submitting", formValues);
    };

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    const getBackgroundColorStyle = (value, matchValue) => {
        return value === matchValue ? { backgroundColor: "#d2d1d3" } : {};
    };

    return (
        <ScrollView style={ { width: "100%" } }>

            <View>
                <View className="p-5">
                    <Text>Title</Text>
                    <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                        <TextInput
                            placeholder="title"
                            onChangeText={ text => handleChange("title", text) }
                        />
                    </View>
                    <Text>Material</Text>
                    <View className="mb-8">
                        <RadioButton.Group
                            onValueChange={ newValue => handleChange("material", newValue) }
                            value={ formValues?.material }
                        >
                            <RadioButton.Item
                                value="pla"
                                label="PLA"
                                style={ {
                                    ...getBackgroundColorStyle(formValues?.material, "pla"),
                                } }
                            />
                            <RadioButton.Item
                                value="petg"
                                label="PETG"
                                style={ {
                                    ...getBackgroundColorStyle(formValues?.material, "petg"),
                                } }
                            />
                            <RadioButton.Item
                                value="abs"
                                label="ABS"
                                style={ {
                                    ...getBackgroundColorStyle(formValues?.material, "abs"),
                                } }
                            />
                        </RadioButton.Group>
                    </View>
                    <View className="mb-8">
                        <Text>Adhesion</Text>

                        <RadioButton.Group onValueChange={ newValue => handleChange("adhesion", newValue) } value={ formValues?.adhesion }>
                            <RadioButton.Item
                                value="skirt"
                                label="Skirt"
                                style={ {
                                    ...getBackgroundColorStyle(formValues?.adhesion, "skirt"),
                                } }
                            />
                            <RadioButton.Item
                                value="brim"
                                label="Brim"
                                style={ {
                                    ...getBackgroundColorStyle(formValues?.adhesion, "brim"),
                                } }
                            />
                            <RadioButton.Item
                                value="raft"
                                label="Raft"
                                style={ {
                                    ...getBackgroundColorStyle(formValues?.adhesion, "raft"),
                                } }
                            />
                        </RadioButton.Group>
                    </View>
                    <Text>Supports</Text>
                    <RadioButton.Group onValueChange={ newValue => handleChange("uses_supports", newValue == "true") } value={ formValues?.uses_supports ? "true" : "false" }>
                        <RadioButton.Item
                            value="true"
                            label="Yes"
                            style={ {
                                ...getBackgroundColorStyle(formValues?.uses_supports, true),
                            } }
                        />
                        <RadioButton.Item
                            value="false"
                            label="No"
                            style={ {
                                ...getBackgroundColorStyle(formValues?.uses_supports, false),
                            } }
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
        </ScrollView>
    );
};

export default StorePrint;
