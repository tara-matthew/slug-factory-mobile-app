import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import apiFetch from "../hooks/apiFetch";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import { useUser } from "../contexts/UserContext";
import RadioButtonGroupWithHeading from "../components/molecule/RadioButtonGroupWithHeading";
import { adhesionRadioButtons, materialRadioButtons, supportsRadioButtons } from "../config/radio-buttons";
import ImageSelector from "../components/molecule/ImageSelector";

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
        } catch (error) {
            console.log("error", error.message);
        } finally {
            setLoading(false);
        }
    };

    function handleDataFromChild(key, value) {
        handleChange(key, value);
    }

    function handleImages(value) {
        setImages(value);
    }

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
                            <ImageSelector sendDataToParent={ handleImages } />

                            <Text className="font-bold text-lg">Title</Text>
                            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                                <TextInput
                                    placeholder="title"
                                    onChangeText={ text => handleChange("title", text) }
                                />
                            </View>

                            <RadioButtonGroupWithHeading
                                radioButtons={ materialRadioButtons }
                                groupID="filament_material_id"
                                heading="Material"
                                initialValue={ formValues?.filament_material_id?.toString() }
                                sendDataToParent={ handleDataFromChild }
                            />

                            <RadioButtonGroupWithHeading
                                heading="Adhesion"
                                groupID="adhesion_type"
                                radioButtons={ adhesionRadioButtons }
                                initialValue={ formValues?.adhesion_type }
                                sendDataToParent={ handleDataFromChild }
                            />

                            <RadioButtonGroupWithHeading
                                heading="Supports"
                                groupID="uses_supports"
                                radioButtons={ supportsRadioButtons }
                                initialValue={ formValues?.uses_supports ? "true" : "false" }
                                sendDataToParent={ handleDataFromChild }
                            />

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

export default StorePrint;
