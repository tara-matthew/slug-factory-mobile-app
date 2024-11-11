import React, {useEffect, useState} from "react";
import {Text, TextInput, View} from "react-native";
import {useAuth} from "../contexts/AuthContext";
import {IUser} from "../contracts/User";

const EditProfile = () => {
    const [user, setUser] = useState<Partial<IUser>>({});
    const { getUser } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUser(user);
        };

        void fetchUser();
        console.log(user);

    }, []);
    return (
        <View>
            <Text>Name</Text>
            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                <TextInput value={user.name}></TextInput>
            </View>
            <Text>Email</Text>
            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                <TextInput value={user.email}></TextInput>
            </View>
            <Text>Bio</Text>
            <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                <TextInput value={user?.profile?.bio}></TextInput>
            </View>
        </View>
    );
};

export default EditProfile;
