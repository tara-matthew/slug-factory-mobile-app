import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import InfoCard from "../components/molecule/InfoCard";
import { MaterialIcons } from "@expo/vector-icons";
import ContentWithDivider from "../components/molecule/ContentWithDivider";
import { useNavigation } from "@react-navigation/native";
import EditProfile from "./EditProfile";
import TouchableLink from "../components/molecule/TouchableLink";

const MyProfile = () => {
    interface IUser {
        name: string;
        email: string;
    }

    const [user, setUser] = useState<Partial<IUser>>({});
    const { getUser } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            console.log(user);
            setUser(user);
        };

        void fetchUser();
    }, []);

    return (
        <View className="my-5 w-full m-auto px-5">
            <InfoCard
                imageUrl="https://avatars.githubusercontent.com/u/97165289"
                name={ user.name }
                uploadCount={ 5 }
                info={ ["1 follower", "25 favourites", user.email] }
            />
            <View className="w-full mt-4">
                <TouchableLink to={EditProfile} title={'Edit Profile'} />
                <TouchableLink to={EditProfile} title={'Favourites'} />
                <TouchableLink to={EditProfile} title={'Recent prints'} />
                <TouchableLink to={EditProfile} title={'Printer & filament preference'} />
                <TouchableLink to={EditProfile} title={'Saved tutorials & notes'} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    view: {
        // paddingVertical: 50,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "gray",
    },
});

export default MyProfile;
