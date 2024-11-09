import React, {useEffect, useMemo, useState} from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PillGroup from "../components/molecule/PillGroup";
import InfoCard from "../components/molecule/InfoCard";
import ImageList from "../components/molecule/ImageList";
import { Size } from "../contracts/Image";
import {useAuth} from "../contexts/AuthContext";

const PrintedDesign = ({ route }) => {
    const { print } = route.params;
    const { getUser } = useAuth();
    const [user, setUser] = useState<Partial<IUser>>({});
    // const [belongsToUser, setBelongsToUser] = useState(false);



    const pills = [
        // { title: "Ender-3" },
        { title: print.filament_material.name },
        // { title: print?.filament_brand?.name ?? "A brand" },
        // { title: print?.filament_colour?.name ?? "A colour" },
        // { title: "20% infill" },
        { title: "Supports" },
        { title: print?.settings?.adhesion_type ?? "Skirt" },
        // { title: "Another tag" },
        // { title: "Yet another tag" },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUser(user);
        };

        void fetchUser();

    }, []);

    const belongsToUser = user?.id === print.user_id;
    const favouriteText = useMemo(() => {
       return print.is_favourite ? "Unfavourite" : "Favourite";
    }, [print, print.is_favourite])
    
    const toggleFavourite = () => {
        if (print.is_favourite) {
            // call store favourite endpoint
        } else {
            // call remove favourite endpoint
        }
    }


    return (
        <ScrollView style={ { width: "100%" } }>
            <View style={ styles.imageContainer }>
                <ImageList images={ print.images } size={ Size.Large } />
            </View>
            {!belongsToUser && <Button onPress={toggleFavourite} title={favouriteText}></Button>}

            <View style={ styles.container }>
                <Text className="text-center text-2xl mt-5 font-bold">{print.title}</Text>

                <View className="my-5">
                    <Text className="mb-4">{print.description}</Text>
                </View>

                <PillGroup pills={ pills } />

                <View style={ styles.divider } />

                <View className="my-5 w-full m-auto">
                    <InfoCard
                        imageUrl="https://avatars.githubusercontent.com/u/97165289"
                        name="Tara"
                        uploadCount={ 10 }
                        info={ ["Thingiverse", "21/8/2024", "Printed 3 times", "4 reviews"] }

                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        // paddingVertical: 20,
        paddingHorizontal: 15,
    },
    imageContainer: {
        // height: 400
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#DFE4EA",
    },
});

export default PrintedDesign;
