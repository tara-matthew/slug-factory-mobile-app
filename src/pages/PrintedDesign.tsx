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
import ApiFetch from "../hooks/apiFetch";

const PrintedDesign = ({ route }: PrintedDesignProps) => {
    const navigation = useNavigation<EditPrintedDesignNavigationProps>();
    const printID = route.params.print_id;
    const [print, setPrint] = useState<PrintData>(defaultPrint);
    const [lists, setLists] = useState<ListData[]>();
    const [originalLists, setOriginalLists] = useState<ListData[]>([]);

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
    const favouriteInfoText = `On ${usePluralisedText(print.list_count, "list", "lists")}`;

    const belongsToUser = user?.id === print.user_id;

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

    async function save(items) {
        // Stop already-selected lists in the UI (from previous adds) being put in the toAddIDs array, as any list which is selected in the UI will have contains_item set to true
        const toAddIDs = items
            .filter((item, i) => !originalLists[i].contains_item && item.contains_item)
            .map(item => item.id);

        const toRemoveIDs = items
            .filter((item, i) => originalLists[i].contains_item && !item.contains_item)
            .map(item => item.id);

        console.log(toAddIDs, toRemoveIDs)

        try {
            const response = await apiFetch(`/my/prints/${printID}/printed-design-lists`, "POST", {
                printed_design_list_add_ids: toAddIDs,
                printed_design_list_remove_ids: toRemoveIDs,
            });

            console.log(response, toAddIDs)
            // Ensure that original lists is updated, otherwise there will be duplicates
            setOriginalLists((prevLists) => {
                return prevLists.map((list) => {
                    if (toAddIDs.includes(list.id)) {
                        // console.log(list.count)
                        const newCount = list.count + 1

                        return { ...list, contains_item: true, extraData: `${newCount} in list` };
                    }
                    if (toRemoveIDs.includes(list.id)) {
                        // console.log(list.count)

                        const newCount = list.count - 1

                        return { ...list, contains_item: false, extraData: `${newCount} in list` };
                    }
                    return list;
                });
            });

            // Update list count?
            setLists((prevLists) => {
                return prevLists.map((list) => {
                    if (toAddIDs.includes(list.id)) {
                        console.log(list.count)
                        const newCount = list.count
                        return { ...list, contains_item: true, extraData: `${list.count} in list` };
                    }
                    if (toRemoveIDs.includes(list.id)) {
                        console.log(list.count)
                        const newCount = list.count
                        return { ...list, contains_item: false, extraData: `${list.count} in list` };
                    }
                    return {...list, extraData: `200 in list`};
                });
            });
            setPrint(prevPrint => ({
                ...prevPrint,
                list_count: prevPrint.list_count + toAddIDs.length - toRemoveIDs.length,
            }));
        } catch (error) {
            console.error(error)
        } finally {
            setModalVisible(false)
        }
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
                setOriginalLists(lists)
                // console.log(lists)
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

            {!belongsToUser && <View className="w-full flex flex-row justify-center"><Button onPress={ toggleFavourite } title="Add to List"></Button></View>}
            <View style={ styles.container }>
                <BaseModal
                    title="Add to List"
                    items={ lists }
                    sendDataToParent={ handleDataFromChild }
                    saveInParent={ save }
                    visible={ modalVisible }
                    onClose={ () => {
                        setModalVisible(!modalVisible);
                    } }
                />

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
