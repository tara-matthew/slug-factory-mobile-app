import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
} from "react-native";
import apiFetch from "../hooks/apiFetch";
import { useNavigation } from "@react-navigation/native";
import { GenericNavigationProps } from "../contracts/Navigator";
import { useUser } from "../contexts/UserContext";
import RadioButtonGroupWithHeading from "../components/molecule/RadioButtonGroupWithHeading";
import { adhesionRadioButtons, materialRadioButtons, supportsRadioButtons } from "../config/radio-buttons";
import ImageSelector from "../components/molecule/ImageSelector";
import useFormData from "../hooks/useFormData";
import LoadingSpinner from "../components/atom/LoadingSpinner";
import BaseButton from "../components/atom/BaseButton";
import InputWithLabel from "../components/molecule/InputWithLabel";
import { TitleSize } from "../contracts/InputWithLabel";

const StorePrint = () => {
    // TODO Could refactor to use useReducer
    const [formValues, setFormValues] = useState({ adhesion_type: "skirt", filament_material_id: 1, uses_supports: false, title: "", description: "" });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setUser } = useUser();

    const navigation = useNavigation<GenericNavigationProps>();
    const formData = useFormData(images, formValues);

    const handleChange = (name: string, value: string | number | boolean) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDataFromChild = (key, value) => {
        handleChange(key, value);
    };

    const handleImages = (value) => {
        setImages(value);
    };

    const handleSubmit = async () => {
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

    /* TODO read from the database on app load, add a context, and use that here */
    /* TODO could generate radioButtonGroupWithHeading components in a loop when done atomically */

    return (
        <View style={ { flex: 1 } }>
            {loading && (
                <LoadingSpinner />
            )}

            <KeyboardAvoidingView behavior="position">
                <ScrollView contentContainerStyle={ { flexGrow: 1 } } style={ { width: "100%" } }>
                    <View>
                        <View className="p-5">
                            <ImageSelector sendDataToParent={ handleImages } />
                            <InputWithLabel
                                title="Title"
                                titleSize={ TitleSize.Large }
                                placeholder="title"
                                isMultiline={ false }
                                sendDataToParent={ handleDataFromChild }
                            >
                            </InputWithLabel>

                            <View className="mb-7">
                                <RadioButtonGroupWithHeading
                                    radioButtons={ materialRadioButtons }
                                    groupID="filament_material_id"
                                    heading="Material"
                                    initialValue={ formValues?.filament_material_id?.toString() }
                                    sendDataToParent={ handleDataFromChild }
                                />
                            </View>

                            <View className="mb-7">
                                <RadioButtonGroupWithHeading
                                    heading="Adhesion"
                                    groupID="adhesion_type"
                                    radioButtons={ adhesionRadioButtons }
                                    initialValue={ formValues?.adhesion_type }
                                    sendDataToParent={ handleDataFromChild }
                                />
                            </View>

                            <View className="mb-7">
                                <RadioButtonGroupWithHeading
                                    heading="Supports"
                                    groupID="uses_supports"
                                    radioButtons={ supportsRadioButtons }
                                    initialValue={ formValues?.uses_supports ? "true" : "false" }
                                    sendDataToParent={ handleDataFromChild }
                                />
                            </View>

                            <InputWithLabel
                                title="Description"
                                titleSize={ TitleSize.Large }
                                placeholder="description"
                                isMultiline={ true }
                                sendDataToParent={ handleDataFromChild }
                            >
                            </InputWithLabel>
                            <View className="w-full mt-4">
                                <BaseButton title="Submit" sendDataToParent={ handleSubmit }></BaseButton>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default StorePrint;
