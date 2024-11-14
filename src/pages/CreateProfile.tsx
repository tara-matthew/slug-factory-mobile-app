import {View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {useUser} from "../contexts/UserContext";
import React, {useState} from "react";
import apiFetch from "../hooks/apiFetch";
import {fromResponse} from "../data-transfer-objects/UserData";

const CreateProfile = () => {
    const [formValues, setFormValues] = useState({})
    const {user, setUser} = useUser();

    // console.log(formValues)

    const handleChange = (name: string, value: string) => {
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
        // console.log(formValues);
    };

    const handleSubmit = async () => {
        try {
            setFormValues(prevValues => ({ ...prevValues, profile_set_public_at: new Date().toISOString() }));
            const updatedUser = await apiFetch("/me", "PATCH", formValues);
            console.log(updatedUser);
            const userData = fromResponse(updatedUser.data);
            setUser(userData);
            console.log(userData);
            // navigation.navigate("MyProfile");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <ScrollView contentContainerStyle={ styles.container }>
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
)
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
});
export default CreateProfile;
