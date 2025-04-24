import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import apiFetch from "../../hooks/apiFetch";
import Grid from "./Grid";

// TODO Use a slot rather than hardcoded grid

const BaseModal = ({ visible, onClose, items }) => {
    return (
        <SafeAreaProvider>
            <View className="flex flex-1 justify-center text-center">
                <Modal
                    animationType="slide"
                    transparent={ true }
                    visible={ visible }
                    onRequestClose={ onClose }
                >
                    <View className="flex flex-1 justify-center text-center bg-black/50">
                        <View className="w-full max-h-[80%] pt-5 bg-white rounded-xl p-1 shadow-md shadow-black/25">
                            <View className="flex-row items-center my-5 px-4">
                                <Text className="font-bold text-xl text-center flex-1">Save to list</Text>
                                <Pressable onPress={ onClose }>
                                    <Text>✕</Text>
                                </Pressable>
                            </View>
                            <View className={"px-4 max-h-[90%]"}>
                                <Grid items={ items } sendDataToParent={ null } />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaProvider>
    );
};

export default BaseModal;
