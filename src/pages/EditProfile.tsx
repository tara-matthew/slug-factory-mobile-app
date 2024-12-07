import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import apiFetch from "../hooks/apiFetch";
import {fromResponse} from "../data-transfer-objects/UserData";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../contracts/Navigator";
import {useUser} from "../contexts/UserContext";
import BaseButton from "../components/atom/BaseButton";
import InputWithLabel from "../components/molecule/InputWithLabel";
import {TitleSize} from "../contracts/InputWithLabel";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const EditProfile = () => {
    const [formValues, setFormValues] = useState({});

    const { user, setUser, loading } = useUser();
    const navigation = useNavigation<NavigationProps>();

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
                <InputWithLabel title={"Name"} titleSize={TitleSize.Large} placeholder={"name"} isMultiline={false} sendDataToParent={handleChange} defaultValue={user.name}></InputWithLabel>
                <InputWithLabel title={"Email"} titleSize={TitleSize.Large} placeholder={"email"} isMultiline={false} sendDataToParent={handleChange} defaultValue={user.email}></InputWithLabel>
                <InputWithLabel title={"Bio"} titleSize={TitleSize.Large} placeholder={"bio"} isMultiline={true} sendDataToParent={handleChange} defaultValue={user.bio}></InputWithLabel>
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
