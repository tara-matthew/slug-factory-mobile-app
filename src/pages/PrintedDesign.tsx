import React, { useEffect, useMemo, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import PillGroup from "../components/molecule/PillGroup";
import InfoCard from "../components/molecule/InfoCard";
import ImageList from "../components/molecule/ImageList";
import { Size } from "../contracts/Image";
import apiFetch from "../hooks/apiFetch";
import { usePrints } from "../contexts/PrintsContext";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import usePluralisedText from "../hooks/usePluralisedText";
import fetchData from "../hooks/apiFetch";
import {defaultPrint, PrintData} from "../data-transfer-objects/PrintData";
import {EditPrintedDesignNavigationProps} from "../contracts/Navigator";

const PrintedDesign = ({ route }) => {
    const navigation = useNavigation<EditPrintedDesignNavigationProps>();
    const printID = route.params.print_id;
    const [print, setPrint] = useState<PrintData>(defaultPrint);
    const [loading, setLoading] = useState(true);
    const { updatePrint, toggleFavouritePrint } = usePrints();
    const { user, setUser } = useUser();

    const adhesionType = useMemo(() => {
        return `${print.settings.adhesion_type.charAt(0).toUpperCase()}${print.settings.adhesion_type.slice(1)}`;
    }, [print]);

    const supportsText = print.settings.uses_supports ? "Supports" : "No Supports";

    const printCreatedAt = new Date(print.created_at).toLocaleDateString("en-GB");

    const pills = [
        { title: print?.filament_material?.name },
        { title: supportsText },
        { title: adhesionType },
    ];
    const uploadText = usePluralisedText(print.user.prints_count, "upload", "uploads");
    const favouriteInfoText = `Favourited ${usePluralisedText(print.favourited_count, "time", "times")}`;

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

    // TODO could put in a hook?

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
        const fetchPrint = async () => {
            try {
                const fetchedPrint = await fetchData(`/prints/${printID}`);
                setPrint(fetchedPrint.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (belongsToUser) {
            navigation.setOptions({
                headerRight: () => (
                    <Button title="Edit" onPress={ () => navigation.navigate("EditPrint", { id: print.id }) }></Button>
                ),
            });
        }
        void fetchPrint();
    }, [navigation, print.id]);

    if (loading) {
        return (<Text>Loading...</Text>);
    }

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
                        uploadText={ uploadText }
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
