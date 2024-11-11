import React, {useEffect, useState} from "react";
import {Text, TextInput, View} from "react-native";
import {useAuth} from "../contexts/AuthContext";
import {IUser} from "../contracts/User";
import apiFetch from "../hooks/apiFetch";
import {fromResponse} from "../data-transfer-objects/UserData";

const EditProfile = () => {
    const [user, setUser] = useState<Partial<IUser>>({});
    const [formValues, setFormValues] = useState({});

    // const { getUser } = useAuth();

    const handleChange = (name: string, value: string | number | boolean) => {
        setUser({ ...user, [name]: value });
        console.log(user);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const user = await apiFetch("/me");
            const userData = fromResponse(user.data);
            setUser(userData);
        };

        void fetchUser();
    }, []);
    return (
        <View>
            <Text>Name</Text>
            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                <TextInput defaultValue={user.name} onChangeText={ text => handleChange("name", text) }></TextInput>
            </View>
            <Text>Email</Text>
            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                <TextInput defaultValue={user.email} onChangeText={ text => handleChange("email", text) }></TextInput>
            </View>
            <Text>Bio</Text>
            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                <TextInput defaultValue={user.bio} onChangeText={ text => handleChange("profile.bio", text) }></TextInput>
            </View>
        </View>
    );
};

export default EditProfile;
