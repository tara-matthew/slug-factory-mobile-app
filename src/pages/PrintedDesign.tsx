import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import PillGroup from "../components/molecule/PillGroup";
import InfoCard from "../components/molecule/InfoCard";
import ImageList from "../components/molecule/ImageList";
import { Size } from "../contracts/Image";
import apiFetch from "../hooks/apiFetch";
import { usePrints } from "../contexts/PrintsContext";
import { useUser } from "../contexts/UserContext";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const PrintedDesign = ({ route }) => {
    const navigation = useNavigation();
    // TODO just pass in the print ID rather than the whole object, this is an anti-pattern!
    // https://reactnavigation.org/docs/params/
    // console.log(route.params.print_id);
    const [print, setPrint] = useState(route.params.print);
    const { updatePrint, toggleFavouritePrint } = usePrints();
    const { user, setUser } = useUser();

    const pills = [
        // { title: "Ender-3" },
        // { title: print.filament_material.name },
        // { title: print?.filament_brand?.name ?? "A brand" },
        // { title: print?.filament_colour?.name ?? "A colour" },
        // { title: "20% infill" },
        { title: "Supports" },
        { title: print?.settings?.adhesion_type ?? "Skirt" },
        // { title: "Another tag" },
        // { title: "Yet another tag" },
    ];

    const printCreatedAt = useMemo(() => {
        return format(new Date(print.created_at), "dd/mm/yyyy");
    });

    const uploadText = useMemo(() => {
        const text = print.user.prints_count > 1 ? "uploads" : "upload";

        return `${print.user.prints_count} ${text}`;
    }, []);

    const favouriteInfoText = useMemo(() => {
        const text = print.favourited_count > 1 || print.favourited_count === 0 ? "times" : "time";

        return `Favourited ${print.favourited_count} ${text}`;
    }, [print.favourited_count]);

    const belongsToUser = user?.id === print.user_id;
    const favouriteText = useMemo(() => {
        return print.is_favourite ? "Unfavourite" : "Favourite";
    }, [print, print.is_favourite]);

    const toggleFavourite = async () => {
        if (!print.is_favourite) {
            await addToFavourites();
        } else {
            await removeFromFavourites();
        }
        toggleFavouriteStatus();
        // Makes sure if we go back and back onto the print, the state remains updated
        const updatedPrint = { ...print, is_favourite: !print.is_favourite, favourited_count: print.favourited_count + (print.is_favourite ? -1 : +1) };
        updatePrint(updatedPrint);
        toggleFavouritePrint(updatedPrint);
        setUser(prevUser => ({
            ...prevUser,
            favourites_count: prevUser.favourites_count + (print.is_favourite ? -1 : 1),
        }));
    };

    const addToFavourites = async () => {
        try {
            await apiFetch(`/favourites/printed_design/${print.id}`, "POST");
        } catch (e) {
            console.error(e);
        }
    };

    const removeFromFavourites = async () => {
        try {
            await apiFetch(`/favourites/printed_design/${print.id}`, "DELETE");
        } catch (e) {
            console.error(e);
        }
    };

    const toggleFavouriteStatus = () => {
        // For showing the state update immediately in the component (different from comment above)
        setPrint(prevPrint => ({
            ...prevPrint,
            is_favourite: !prevPrint.is_favourite, // Toggle the favourite status
            favourited_count: prevPrint.favourited_count + (print.is_favourite ? -1 : +1),
        }));
    };

    useEffect(() => {
        if (belongsToUser) {
            navigation.setOptions({
                headerRight: () => (
                    <Button title="Edit" onPress={ () => navigation.navigate("EditPrint", { id: print.id }) }></Button>
                ),
            });
        }
    }, [navigation]);

    return (
        <ScrollView style={ { width: "100%" } }>
            <View style={ styles.imageContainer }>
                <ImageList images={ print.images } size={ Size.Large } />
            </View>
            {!belongsToUser && <View className="w-full flex flex-row justify-center"><Button onPress={ toggleFavourite } title={ favouriteText }></Button></View>}

            <View style={ styles.container }>
                <Text className="text-center text-2xl mt-5 font-bold">{print.title}</Text>

                <View className="my-5">
                    <Text className="mb-4">{print.description}</Text>
                </View>

                <PillGroup pills={ pills } />

                <View style={ styles.divider } />

                <View className="my-5 w-full m-auto">
                    <InfoCard
                        imageUrl={ print.user.avatar_url }
                        name={ print.user.username }
                        uploadCount={ uploadText }
                        info={ [printCreatedAt, "0 reviews", favouriteInfoText] }

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
