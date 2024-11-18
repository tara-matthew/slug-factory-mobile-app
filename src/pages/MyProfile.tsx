import React, { useMemo } from "react";
import {Button, View} from "react-native";
import InfoCard from "../components/molecule/InfoCard";
import EditProfile from "./EditProfile";
import TouchableLink from "../components/molecule/TouchableLink";
import MyPrints from "./MyPrints";
import { useUser } from "../contexts/UserContext";
import {useAuth} from "../contexts/AuthContext";

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

    return (
        <View className="my-5 w-full m-auto px-5">
            <InfoCard
                imageUrl={ user.avatar_url }
                name={ user.username }
                uploadCount={ uploadText }
                info={ [favouritesText, user.email] }
            />
            <View className="w-full mt-4 mb-8">
                <TouchableLink to={ EditProfile } title="Edit Profile" />
                <TouchableLink to={ MyPrints } title="My prints" />
            </View>
            <View>
                <Button title="Sign out" onPress={logout}></Button>
                {/* <TouchableLink to={ EditProfile } title="Printer & filament preference" /> */}
                {/* <TouchableLink to={ EditProfile } title="Saved tutorials & notes" /> */}
            </View>
        </View>
    );
};

export default MyProfile;
