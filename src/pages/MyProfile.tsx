import React, { useMemo } from "react";
import { Button, View } from "react-native";
import InfoCard from "../components/molecule/InfoCard";
import EditProfile from "./EditProfile";
import MyPrints from "./MyPrints";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import TouchableElementList from "../components/organism/TouchableElementList";

const MyProfile = () => {
    const { user } = useUser();
    const { logout } = useAuth();

    const favouritesText = useMemo(() => {
        return `${user.favourites_count} favourites`;
    }, [user.favourites_count]);

    const uploadText = useMemo(() => {
        const text = user.prints_count > 1 || user.prints_count === 0 ? "uploads" : "upload";

        return `${user.prints_count} ${text}`;
    }, []);

    const dividerItems = [
        {
            to: EditProfile,
            title: "Edit profile",
        },
        {
            to: MyPrints,
            title: "My prints",
        },
    ];

    return (
        <View className="my-5 w-full m-auto px-5">
            <InfoCard
                imageUrl={ user.avatar_url }
                name={ user.username }
                uploadText={ uploadText }
                info={ [favouritesText, user.email] }
            />
            <View className="w-full mt-4 mb-8">
                <TouchableElementList items={ dividerItems } />
            </View>
            <View>
                <Button title="Sign out" onPress={ logout }></Button>
            </View>
        </View>
    );
};

export default MyProfile;
