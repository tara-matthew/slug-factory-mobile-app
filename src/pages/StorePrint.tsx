import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import apiFetch from "../hooks/apiFetch";
import ImageList from "../components/molecule/ImageList";
import { Size } from "../contracts/Image";

const StorePrint = () => {
    const [formValues, setFormValues] = useState({ adhesion: "skirt", filament_material_id: 1, uses_supports: false, title: "" });
    const [images, setImages] = useState([]);

    const handleChange = (name: string, value: string | number | boolean) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        Object.keys(formValues).forEach((key) => {
            formData.append(key, formValues[key]);
        });
        formData.append("description", "sepifjoifk");
        formData.append("filament_brand_id", 1);
        formData.append("filament_colour_id", 1);

        if (images) {
            images.forEach((image) => {
                formData.append("images[]", {
                    uri: image.uri,
                    name: image.name,
                    type: image.type,
                });
            });
        }
        try {
            const result = await apiFetch("/prints", "POST", formData);
        } catch (error) {
            console.log("error", error);
        }
    };

    // TODO could memoise this
    const getBackgroundColorStyle = (value, matchValue) => {
        return value === matchValue ? { backgroundColor: "#d0cadb" } : {};
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map(asset => ({
                uri: asset.uri,
                name: asset.fileName || "image.jpg",
                type: asset.mimeType || "image/jpeg",
            }));

            setImages(selectedImages);
        }
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
                    <View style={ styles.container } className={"mb-8"}>
                        <Button title="Upload images" onPress={ pickImage } />
                        {images.length > 0
                        && <ImageList size={ Size.Small } images={ images.map(i => i.uri) } />}
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
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30,

    },
});

export default StorePrint;
