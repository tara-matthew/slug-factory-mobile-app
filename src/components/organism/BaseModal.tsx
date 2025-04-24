import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import apiFetch from "../../hooks/apiFetch";
import Grid from "./Grid";

const BaseModal = ({ printID }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [lists, setLists] = useState([{}]);

    useEffect(() => {
        void getLists();
    }, []);

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
            console.log(lists);
            // setLoading(false);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex flex-1 justify-center text-center">
                <Modal
                    animationType="slide"
                    transparent={ true }
                    visible={ modalVisible }
                    onRequestClose={ () => {
                        setModalVisible(!modalVisible);
                    } }
                >
                    <View className="flex flex-1 justify-center text-center bg-black/50">
                        <View className="w-full max-h-[80%] bg-white rounded-xl p-1 shadow-md shadow-black/25">
                            <View className="flex-row items-center mt-5 px-4">
                                <Text className="font-bold text-xl text-center flex-1">Save to list</Text>
                                <Pressable onPress={ () => setModalVisible(false) }>
                                    <Text>✕</Text>
                                </Pressable>
                            </View>
                            <Grid items={ lists } sendDataToParent={ null } />
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={ [styles.button, styles.buttonOpen] }
                    onPress={ () => setModalVisible(true) }
                >
                    <Text>Show Modal</Text>
                </Pressable>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    // closeButton: {
    //     position: "absolute",
    //     top: 18,
    //     right: 10,
    //     zIndex: 1,
    //     backgroundColor: "#eee",
    //     borderRadius: 15,
    //     width: 30,
    //     height: 30,
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // closeButtonText: {
    //     fontSize: 18,
    //     fontWeight: "bold",
    //     color: "#333",
    // },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
});

export default BaseModal;
