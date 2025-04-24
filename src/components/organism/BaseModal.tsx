import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import apiFetch from "../../hooks/apiFetch";
import Grid from "./Grid";

const BaseModal = ({ printID, visible, onClose }) => {
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
                    visible={ visible }
                    onRequestClose={ onClose }
                >
                    <View className="flex flex-1 justify-center text-center bg-black/50">
                        <View className="w-full max-h-[80%] bg-white rounded-xl p-1 shadow-md shadow-black/25">
                            <View className="flex-row items-center mt-5 px-4">
                                <Text className="font-bold text-xl text-center flex-1">Save to list</Text>
                                <Pressable onPress={ onClose }>
                                    <Text>✕</Text>
                                </Pressable>
                            </View>
                            <Grid items={ lists } sendDataToParent={ null } />
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default BaseModal;
