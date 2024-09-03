import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const InfoCard = () => {
    return (
        <View style={styles.container} className={'rounded-lg shadow-sm p-8'}>
            <View className={'flex flex-row items-center'}>
                <View className="justify-center items-center">
                    <Image
                        style={{
                            width: 75,
                            height: 75,
                            borderRadius: 75,
                            marginBottom: 8
                        }}
                        resizeMode={"cover"}
                        source={{
                            uri: 'https://avatars.githubusercontent.com/u/97165289',
                        }}
                    />

                    <Text
                        className={"text-xl font-bold text-center"}
                        style={{ maxWidth: 120, textAlign: 'center' }}
                        numberOfLines={1}
                    >
                        Tara
                    </Text>

                    <Text
                        className={"text-lg text-center"}
                        style={{ maxWidth: 120, textAlign: 'center' }}
                    >
                        10 uploads
                    </Text>
                </View>

                <View className="flex-1 flex flex-col items-end">
                    <TouchableOpacity>
                        <Text className={'text-xl font-bold pb-2'}>Thingiverse</Text>
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
    );


}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: "#d0cadb"//'#e8e8e8', //"#e8eaeb",
    },
    divider: {
        width: '50%',
        height: 1,
        backgroundColor: 'gray'
    }
})

export default InfoCard;
