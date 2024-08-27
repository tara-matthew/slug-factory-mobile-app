import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const InfoCard = () => {
    return (
        <View style={styles.container} className={'rounded-lg shadow-sm p-8'}>
            <View className={'flex flex-row items-center'}>
                {/* Left Section: Image and Text */}
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
                            uri: 'https://picsum.photos/640/480?random=40225',
                        }}
                    />

                    {/* Wrapping the text under the image */}
                    <Text
                        className={"text-xl font-bold text-center"}
                        style={{ maxWidth: 120, textAlign: 'center' }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
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

                {/* Right Section: Other Information */}
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
        backgroundColor: '#e8e8e8', //"#e8eaeb",
    },
    divider: {
        width: '50%',
        height: 1,
        backgroundColor: 'gray'
    }
})

export default InfoCard;
