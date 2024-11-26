import React, { useEffect, useState } from "react";
import {
    Button,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RadioButton, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import apiFetch from "../hooks/apiFetch";
import ImageList from "../components/molecule/ImageList";
import { Size } from "../contracts/Image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import * as ImageManipulator from "expo-image-manipulator";
import { fromRequest } from "../data-transfer-objects/ImagePickerData";
import { useUser } from "../contexts/UserContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const StorePrint = () => {
    const [formValues, setFormValues] = useState({ adhesion_type: "skirt", filament_material_id: 1, uses_supports: false, title: "", description: "" });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser();

    const navigation = useNavigation<NavigationProps>();

    const handleChange = (name: string, value: string | number | boolean) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const createFormData = () => {
        const formData = new FormData();

        Object.keys(formValues).forEach((key) => {
            formData.append(key, formValues[key]);
        });

        if (images) {
            images.forEach((image) => {
                formData.append("images[]", {
                    uri: image.url,
                    name: "image",
                    type: "image/jpeg",
                } as unknown as Blob);
            });
        }
        return formData;
    };

    const handleSubmit = async () => {
        const formData = createFormData();
        setLoading(true);

        try {
            const result = await apiFetch("/prints", "POST", formData);
            navigation.reset({
                index: 1,
                routes: [
                    { name: "Main" },
                    { name: "PrintedDesign", params: { print: result.data } },
                ],
            });
            setUser(prevUser => ({
                ...prevUser,
                prints_count: prevUser.prints_count + 1,
            }));
            console.log(user.prints_count);

            // navigation.navigate("PrintedDesign", { print: result.data });
        } catch (error) {
            console.log("error", error.message);
        } finally {
            setLoading(false);
        }
    };

    // TODO could memoise this
    const getBackgroundColorStyle = (value: string | number | boolean, matchValue: string | number | boolean) => {
        return value === matchValue ? { backgroundColor: "#d0cadb" } : {};
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const compressedImagePromises = result.assets.map(asset =>
                ImageManipulator.manipulateAsync(
                    asset.uri,
                    [{ resize: { width: asset.width / 2, height: asset.height / 2 } }],
                    { compress: 0.5 },
                ),
            );

            const compressedImages = await Promise.all(compressedImagePromises);

            const selectedImages = compressedImages.map(asset => ({
                uri: asset.uri,
            }));

            setImages(fromRequest(selectedImages));
        }
    };

    /* TODO read from the database on app load, add a context, and use that here */
    /* TODO generate groups and items in a loop */

    return (
        <View style={ { flex: 1 } }>
            {loading && (
                <View
                    style={ {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        zIndex: 1,
                    } }
                >
                    <ActivityIndicator size="large" color="#0000ff" animating={ true } />
                </View>
            )}

            <KeyboardAvoidingView behavior="position">
                <ScrollView contentContainerStyle={ { flexGrow: 1 } } style={ { width: "100%" } }>
                    <View>
                        <View className="p-5">
                            <View style={ styles.container } className="mb-8">
                                <Button title="Choose images" onPress={ pickImage } />
                                {images.length > 0 && <ImageList size={ Size.Small } images={ images } />}
                            </View>

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
                                    onValueChange={ newValue => handleChange("adhesion_type", newValue) }
                                    value={ formValues?.adhesion_type }
                                >
                                    <RadioButton.Item
                                        value="skirt"
                                        label="Skirt"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues?.adhesion_type, "skirt"),
                                        } }
                                    />
                                    <RadioButton.Item
                                        value="brim"
                                        label="Brim"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues?.adhesion_type, "brim"),
                                        } }
                                    />
                                    <RadioButton.Item
                                        value="raft"
                                        label="Raft"
                                        style={ {
                                            ...getBackgroundColorStyle(formValues?.adhesion_type, "raft"),
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
                                    onPress={ handleSubmit }
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

export default StorePrint;
