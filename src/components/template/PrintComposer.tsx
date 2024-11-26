import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";

const PrintComposer = () => {
    const [formValues, setFormValues] = useState({ adhesion: "skirt", filament_material_id: 1, uses_supports: false, title: "", description: "" });

    const handleChange = (name: string, value: string | number | boolean) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const getBackgroundColorStyle = (value: string | number | boolean, matchValue: string | number | boolean) => {
        return value === matchValue ? { backgroundColor: "#d0cadb" } : {};
    };

    return (
        <View style={ { flex: 1 } }>
            <KeyboardAvoidingView behavior="position">
                <ScrollView contentContainerStyle={ { flexGrow: 1 } } style={ { width: "100%" } }>
                    <View>
                        <View className="p-5">
                            <Text className="font-bold text-lg">Title</Text>
                            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                                <TextInput
                                    placeholder="title"
                                    onChangeText={ text => handleChange("title", text) }
                                />
                            </View>

                            <Text className="font-bold text-lg">Material</Text>
                            <View className="mb-8">
                                <RadioButton.Group
                                    onValueChange={ newValue => handleChange("filament_material_id", parseInt(newValue)) }
                                    value={ formValues?.filament_material_id?.toString() }
                                >
                                    <RadioButton.Item
                                        value="1"
                                        label="PLA"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues.filament_material_id, 1),
                                        } }
                                    />
                                    <RadioButton.Item
                                        value="2"
                                        label="PETG"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues.filament_material_id, 2),
                                        } }
                                    />
                                    <RadioButton.Item
                                        value="3"
                                        label="ABS"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues.filament_material_id, 3),
                                        } }
                                    />
                                    <RadioButton.Item
                                        value="4"
                                        label="Nylon"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues.filament_material_id, 4),
                                        } }
                                    />
                                    <RadioButton.Item
                                        value="5"
                                        label="TPU"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues.filament_material_id, 5),
                                        } }
                                    />
                                </RadioButton.Group>
                            </View>

                            <Text className="font-bold text-lg">Adhesion</Text>
                            <View className="mb-8">
                                <RadioButton.Group
                                    onValueChange={ newValue => handleChange("adhesion", newValue) }
                                    value={ formValues?.adhesion }
                                >
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

                            <Text className="font-bold text-lg">Supports</Text>
                            <View className="mb-8">
                                <RadioButton.Group
                                    onValueChange={ newValue => handleChange("uses_supports", newValue == "true") }
                                    value={ formValues?.uses_supports ? "true" : "false" }
                                >
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
                            </View>

                            <Text className="font-bold text-lg">Description</Text>
                            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                                <TextInput
                                    style={ { height: 50 } }
                                    editable
                                    multiline
                                    numberOfLines={ 10 }
                                    placeholder="description"
                                    onChangeText={ text => handleChange("description", text) }
                                />
                            </View>

                            <View className="w-full mt-4">
                                <TouchableOpacity
                                    style={ { backgroundColor: "#d0cadb" } }
                                    className="w-full p-3.5 rounded-2xl"
                                    // onPress={ handleSubmit }
                                >
                                    <Text className="text-center">Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30,

    },
});

export default PrintComposer;
