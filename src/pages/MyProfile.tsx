import React, {useEffect, useMemo, useState} from "react";
import { View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import InfoCard from "../components/molecule/InfoCard";
import EditProfile from "./EditProfile";
import TouchableLink from "../components/molecule/TouchableLink";
import MyPrints from "./MyPrints";
import {IUser} from "../contracts/User";
import apiFetch from "../hooks/apiFetch";
import {useUser} from "../contexts/UserContext";

const MyProfile = () => {

    // const [user, setUser] = useState<Partial<IUser>>({});
    const { user } = useUser();

    const favouritesText = useMemo(() => {
        return `${user.favourites_count} favourites`;
    }, [user.favourites_count]);


    return (
        <View className="my-5 w-full m-auto px-5">
            <InfoCard
                imageUrl="https://avatars.githubusercontent.com/u/97165289"
                name={ user.username }
                uploadCount={ user.prints_count }
                info={ [favouritesText, user.email] }
            />
            <View className="w-full mt-4">
                <TouchableLink to={ EditProfile } title="Edit Profile" />
                <TouchableLink to={ MyPrints } title="My prints" />
                {/*<TouchableLink to={ EditProfile } title="Printer & filament preference" />*/}
                {/*<TouchableLink to={ EditProfile } title="Saved tutorials & notes" />*/}
            </View>
        </View>
    );
};

export default MyProfile;
