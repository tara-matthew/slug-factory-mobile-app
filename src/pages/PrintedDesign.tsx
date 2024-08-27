import React, {useState} from "react";
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, Button, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Pill from "../components/atom/Pill";

const PrintedDesign = (data) => {
    const print = data.route.params.print;
    console.log(print);
    console.log(print.filament_material_id);
    const imageUrl = print.images[0].url;
    Image.getSize(imageUrl, (width, height) => {
        console.log(width/height)
        setAspectRatio(width/height)
    })
    const [aspectRatio, setAspectRatio] = useState(0);
    const navigation = useNavigation();

    const buttonPressed = () => {
        console.log('here');
        navigation.navigate('Thingiverse' as never)

    }

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
            <Image style={{
                width: '100%',
                height: undefined,
                aspectRatio: aspectRatio,
            }}
                   source={{
                uri: print.images[0]?.url,
            }} />
            <Text className={"text-center text-2xl mt-5 font-bold"}>{print.title}</Text>
                <View className={'my-5'}>
                    <Text className={'mb-4'}>{print.description}</Text>
                </View>

                <View className={"flex flex-row flex-wrap gap-y-4 gap-x-3 mb-9"}>
                    <Pill title={'Ender-3'} />
                    <Pill title={print.filament_material.name} />
                    <Pill title={print.filament_brand.name} />
                    <Pill title={print.filament_colour.name} />
                    <Pill title={'20% infill'} />
                    <Pill title={'Tree supports'} />
                    <Pill title={'Tag'} />
                    <Pill title={'Another Tag'} />
                    <Pill title={'Yet Another Tag'} />
                    <Pill title={'Tag'} />
                </View>
                
                <View style={styles.divider}></View>
                {/*<Text className={"text-center text-2xl mt-5 font-bold"}>Upload Information</Text>*/}
                <View className={"my-5"}>
                    <Text className={"text-lg"}>Uploaded by Test Test</Text>
                    <Text className={"text-lg"}>21/8/2024</Text>
                    <Text className={"text-lg"}>Printed 3 times</Text>
                    <TouchableOpacity onPress={buttonPressed}><Text className={'text-lg font-bold'}>Original from Thingiverse</Text></TouchableOpacity>

                </View>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    view: {
        // paddingVertical: 50,
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#DFE4EA'
    }
});

export default PrintedDesign;
