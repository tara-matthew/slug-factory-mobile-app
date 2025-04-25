import React, { useEffect, useMemo, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import PillGroup from "../components/molecule/PillGroup";
import InfoCard from "../components/molecule/InfoCard";
import ImageList from "../components/molecule/ImageList";
import { Size } from "../contracts/Image";
import apiFetch from "../hooks/apiFetch";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import usePluralisedText from "../hooks/usePluralisedText";
import { PrintData } from "../data-transfer-objects/PrintData";
import { EditPrintedDesignNavigationProps, PrintedDesignProps } from "../contracts/Navigator";
import { defaultPrint } from "../contracts/Print";
import BaseModal from "../components/organism/BaseModal";
import {ListData} from "../data-transfer-objects/ListData";

const PrintedDesign = ({ route }: PrintedDesignProps) => {
    const navigation = useNavigation<EditPrintedDesignNavigationProps>();
    const printID = route.params.print_id;
    const [print, setPrint] = useState<PrintData>(defaultPrint);
    const [lists, setLists] = useState<ListData[]>();
    const [loading, setLoading] = useState({
        lists: true,
        prints: true,
    });
    const { user } = useUser();
    const [modalVisible, setModalVisible] = useState(false);

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
        setModalVisible(true);
    };

    function handleDataFromChild(item) {
        // TODO extract toggle logic into a helper method
        setLists(() => {
            return lists.map((list) => {
                if (list.id !== item.id) {
                    return list;
                }

                const updatedList = { ...list };
                updatedList.contains_item = !item.contains_item;

                return updatedList;
            });
        });
    }

    useEffect(() => {
        const fetchPrint = async () => {
            try {
                const fetchedPrint = await apiFetch(`/prints/${printID}`);
                setPrint(fetchedPrint.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(prevState => ({
                    ...prevState, prints: false,
                }));
            }
        };

        const getLists = async () => {
            try {
                const response = await apiFetch(`/my/printed-design-lists/prints/${printID}/available`);
                const lists = response.data.map(list => ({
                    ...list,
                    extraData: `${list.count} in list`,
                }));
                setLists(lists);
            } catch (error) {
                console.error("Error in getLists", error);
            } finally {
                setLoading(prevState => ({
                    ...prevState, lists: false,
                }));
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
        void getLists();
    }, [navigation, print.id]);

    if (loading.prints || loading.lists) {
        return (<Text>Loading...</Text>);
    }

    return (
        <ScrollView className="w-100">
            <View>
                <ImageList images={ print.images } size={ Size.Large } />
            </View>
            {!belongsToUser && <View className="w-full flex flex-row justify-center"><Button onPress={ toggleFavourite } title={ favouriteText }></Button></View>}
            <View style={ styles.container }>
                <BaseModal
                    items={ lists }
                    sendDataToParent={ handleDataFromChild }
                    visible={ modalVisible }
                    onClose={ () => {
                        setModalVisible(!modalVisible);
                    } }
                >
                </BaseModal>

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
        paddingHorizontal: 15,
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
