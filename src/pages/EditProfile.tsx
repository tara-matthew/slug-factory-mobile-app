import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import apiFetch from "../hooks/apiFetch";
import { fromResponse } from "../data-transfer-objects/UserData";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import { useUser } from "../contexts/UserContext";
import BaseButton from "../components/atom/BaseButton";
import { TitleSize } from "../contracts/InputWithLabel";
import InputGroup from "../components/molecule/InputGroup";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const EditProfile = () => {
    const [formValues, setFormValues] = useState({});

    const { user, setUser, loading } = useUser();
    const navigation = useNavigation<NavigationProps>();

    const inputs = [
        {
            title: "Name",
            titleSize: TitleSize.Large,
            placeholder: "name",
            isMultiline: false,
            defaultValue: user.name,
        },
        {
            title: "Email",
            titleSize: TitleSize.Large,
            placeholder: "email",
            isMultiline: false,
            defaultValue: user.email,
        },
        {
            title: "Bio",
            titleSize: TitleSize.Large,
            placeholder: "bio",
            isMultiline: true,
            defaultValue: user.bio,
        },
    ];

    const handleChange = (name: string, value: string) => {
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const updatedUser = await apiFetch("/me", "PATCH", formValues);
            const userData = fromResponse(updatedUser.data);
            setUser(userData);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    return (
        <View>
            <ScrollView contentContainerStyle={ styles.container }>
                <InputGroup inputs={ inputs } sendDataToParent={ handleChange }></InputGroup>
                <View className="w-full mt-4">
                    <BaseButton title="Submit" sendDataToParent={ handleSubmit }></BaseButton>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
});

export default EditProfile;
