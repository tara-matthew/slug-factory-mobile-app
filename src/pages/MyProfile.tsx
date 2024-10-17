import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import InfoCard from "../components/molecule/InfoCard";
import EditProfile from "./EditProfile";
import TouchableLink from "../components/molecule/TouchableLink";
import MyFavouritePrints from "./MyFavouritePrints";
import MyPrints from "./MyPrints";

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
                <TouchableLink to={ EditProfile } title="Edit Profile" />
                {/*<TouchableLink to={ MyFavouritePrints } title="Favourites" />*/}
                <TouchableLink to={ MyPrints } title="My prints" />
                <TouchableLink to={ EditProfile } title="Printer & filament preference" />
                <TouchableLink to={ EditProfile } title="Saved tutorials & notes" />
            </View>
        </View>
    );
};

export default MyProfile;
