import React, {useState} from "react";
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, Button, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Pill from "../components/atom/Pill";
import PillGroup from "../components/molecule/PillGroup";
import InfoCard from "../components/molecule/InfoCard";

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

    const pills = [
        {
            'title': 'Ender-3'
        },
        {
            'title': print.filament_material.name,
        },
        {
            'title': print.filament_brand.name,
        },
        {
            'title': print.filament_colour.name,
        },
        {
            'title': '20% infill',
        },
        {
            'title': 'Tree supports',
        },
        {
            'title': 'Tag',
        },
        {
            'title': 'Another tag',
        },
        {
            'title': 'Yet another tag',
        }
    ]

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

                <PillGroup pills={pills}></PillGroup>

                <View style={styles.divider}></View>
                <View className={"my-5 w-full m-auto"}>
                    <InfoCard />
                    {/*<Text className={"text-lg"}>Uploaded by Test Test</Text>*/}
                    {/*<Text className={"text-lg"}>21/8/2024</Text>*/}
                    {/*<Text className={"text-lg"}>Printed 3 times</Text>*/}
                    {/*<TouchableOpacity onPress={buttonPressed}><Text className={'text-lg font-bold'}>Original from Thingiverse</Text></TouchableOpacity>*/}

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
