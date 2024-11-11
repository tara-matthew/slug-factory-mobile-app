import React, {useEffect, useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useAuth} from "../contexts/AuthContext";
import {IUser} from "../contracts/User";
import apiFetch from "../hooks/apiFetch";
import {fromResponse} from "../data-transfer-objects/UserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../contracts/Navigator";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;


const EditProfile = () => {
    const [user, setUser] = useState<Partial<IUser>>({});
    const [formValues, setFormValues] = useState({});

    const { getUser } = useAuth();
    const navigation = useNavigation<NavigationProps>();



    const handleChange = (name: string, value: string | number | boolean) => {
        setUser({ ...user, [name]: value });
        console.log(user);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUser(user);
        };

        void fetchUser();
    }, []);

    const handleSubmit = async () => {
        console.log(user);

        try {
            await apiFetch('/me', 'PATCH', user)
            // TODO use a proper context, to avoid doing this
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.navigate("MyProfile");

        } catch (error) {
            console.error(error);
        }
    };

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
                <TextInput defaultValue={user.bio} onChangeText={ text => handleChange("bio", text) }></TextInput>
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
    );
};

export default EditProfile;
