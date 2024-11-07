import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, TextInput, ScrollView, Button, Image, StyleSheet} from "react-native";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import apiFetch from "../hooks/apiFetch";

const StorePrint = () => {
    const [formValues, setFormValues] = useState({ adhesion: "skirt", filament_material_id: 1, uses_supports: false, title: ""});
    const [image, setImage] = useState([]);

    useEffect(() => {
        console.log(image)
    }, [image]);
    const handleChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        Object.keys(formValues).forEach((key) => {
            formData.append(key, formValues[key]);
        });
        console.log(formData);
        formData.append('description', 'sepifjoifk')
        formData.append('filament_brand_id', 1)
        formData.append('filament_colour_id', 1)

        // if (image) {
        //     formData.append("images[][image]", image);
        // }
        if (image) {
            console.log({image})
            image.forEach((i) => {
                formData.append("images[]", {
                    uri: i.uri,
                    name: i.name,
                    type: i.type,
                });
            });
        }
        console.log(formData);
        // console.log("submitting", formValues.images);
        try {
            const result = await apiFetch("/prints", "POST", formData);
        } catch (error) {
            console.log("error", error);
        }
    };

    const getBackgroundColorStyle = (value, matchValue) => {
        return value === matchValue ? { backgroundColor: "#d2d1d3" } : {};
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [1,1],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map((asset) => ({
                uri: asset.uri,
                name: asset.fileName || "image.jpg", // Dynamically set name if available
                type: asset.mimeType || "image/jpeg", // Dynamically set MIME type
            }));

            // Set the images state to the array of selected images
            setImage(selectedImages);
        }
        console.log(image);
    };

    /* TODO read from the database on app load, add a context, and use that here */
    /* TODO generate groups and items in a loop */

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
                    <View style={styles.container}>
                        <Button title="Upload images" onPress={pickImage} />
                        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
                    </View>


                    <Text>Material</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30,

    },
});

export default StorePrint;
