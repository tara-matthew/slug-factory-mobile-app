import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import apiFetch from "../hooks/apiFetch";
import { fromResponse } from "../data-transfer-objects/UserData";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import { useUser } from "../contexts/UserContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const EditProfile = () => {
    // const [user, setUser] = useState<Partial<IUser>>({});
    const [formValues, setFormValues] = useState({});

    const { user, setUser, loading } = useUser();
    const navigation = useNavigation<NavigationProps>();

    const handleChange = (name: string, value: string) => {
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
        console.log(formValues);
    };

    useEffect(() => {
        console.log({ user });
    }, [user]);

    const handleSubmit = async () => {
        try {
            const updatedUser = await apiFetch("/me", "PATCH", formValues);
            console.log(updatedUser);
            const userData = fromResponse(updatedUser.data);
            setUser(userData);
            navigation.navigate("MyProfile");
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

                <Text className="font-bold text-lg">Name</Text>
                <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                    <TextInput defaultValue={ user.name } onChangeText={ text => handleChange("name", text) }></TextInput>
                </View>
                <Text className="font-bold text-lg">Email</Text>
                <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                    <TextInput defaultValue={ user.email } onChangeText={ text => handleChange("email", text) }></TextInput>
                </View>
                <Text className="font-bold text-lg">Bio</Text>
                <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                    <TextInput
                        defaultValue={ user.bio }
                        multiline
                        numberOfLines={ 10 }
                        onChangeText={ text => handleChange("bio", text) }
                    >
                    </TextInput>
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
