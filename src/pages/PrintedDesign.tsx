import React, {useState} from "react";
import {Text, View, Image, ScrollView, StyleSheet} from "react-native";

const PrintedDesign = (data) => {
    const print = data.route.params.print;
    console.log(print.filament_material_id);
    const imageUrl = print.images[0].url;
    Image.getSize(imageUrl, (width, height) => {
        console.log(width/height)
        setAspectRatio(width/height)
    })
    const [aspectRatio, setAspectRatio] = useState(0);

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
            <Text className={"text-center text-xl"}>{print.title}</Text>
                <View className={'my-5'}>
                    <Text className={'mb-4 font-bold'}>{print.description}</Text>
                    <Text className={'mb-4'}>Material: {print.filament_material.name}</Text>
                    <Text className={'mb-4'}>Filament Brand: {print.filament_brand.name}</Text>
                    <Text className={'mb-4'}>Colour: {print.filament_colour.name}</Text>
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
    }
});

export default PrintedDesign;
