import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import InfoCard from "../components/molecule/InfoCard";
import { MaterialIcons } from "@expo/vector-icons";
import ContentWithDivider from "../components/molecule/ContentWithDivider";

const MyProfile = () => {
    interface IUser {
        name: string;
        email: string;
    }

    const [user, setUser] = useState<Partial<IUser>>({});
    const { getUser } = useAuth();

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
                <ContentWithDivider top={false} bottom={true} innerClass={"flex flex-row justify-between items-center w-full"}>
                    <Text className={"py-5 px-10"}>Edit profile</Text>
                    <MaterialIcons name={"chevron-right"} size={20} />
                </ContentWithDivider>
                <ContentWithDivider top={false} bottom={true} innerClass={"flex flex-row justify-between items-center w-full"}>
                    <Text className={"py-5 px-10"}>Favourites</Text>
                    <MaterialIcons name={"chevron-right"} size={20} />
                </ContentWithDivider>
                <ContentWithDivider top={false} bottom={true} innerClass={"flex flex-row justify-between items-center w-full"}>
                    <Text className={"py-5 px-10"}>Recent prints</Text>
                    <MaterialIcons name={"chevron-right"} size={20} />
                </ContentWithDivider>
                <ContentWithDivider top={false} bottom={true} innerClass={"flex flex-row justify-between items-center w-full"}>
                    <Text className={"py-5 px-10"}>Printer & filament preferences</Text>
                    <MaterialIcons name={"chevron-right"} size={20} />
                </ContentWithDivider>
                <ContentWithDivider top={false} bottom={true} innerClass={"flex flex-row justify-between items-center w-full"}>
                    <Text className={"py-5 px-10"}>Saved tutorials & notes</Text>
                    <MaterialIcons name={"chevron-right"} size={20} />
                </ContentWithDivider>
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
