import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const InfoCard = () => {
    return (
        <View style={styles.container} className={'p-8 rounded-lg shadow-sm'}>

            <View className={'flex flex-row'}>
                <View className="flex-1 justify-center">
                    <Text className={"text-xl font-bold"}>Tara</Text>

                    <Text className={"text-lg"}>10 uploads</Text>
                </View>

                <View className="flex flex-col items-end">
                    <TouchableOpacity>
                        <Text className={'text-lg font-bold pb-2'}>Thingiverse</Text>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>

                    <Text className={"text-lg py-2"}>21/8/2024</Text>
                    <View style={styles.divider}></View>

                    <Text className={"text-lg py-2"}>Printed 3 times</Text>
                    <View style={styles.divider}></View>

                    <Text className={"text-lg py-2"}>4 reviews</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: 'white' //"#e8eaeb",
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#DFE4EA'
    }
})

export default InfoCard;
