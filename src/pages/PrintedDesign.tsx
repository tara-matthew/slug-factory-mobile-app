import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PillGroup from "../components/molecule/PillGroup";
import InfoCard from "../components/molecule/InfoCard";

const PrintedDesign = ({ route }) => {
    const { print } = route.params;
    const [aspectRatio, setAspectRatio] = useState(1); // Default aspect ratio
    const navigation = useNavigation();

    useEffect(() => {
        if (print.images.length > 0) {
            const imageUrl = print.images[0].url;
            Image.getSize(imageUrl, (width, height) => {
                setAspectRatio(width / height);
            });
        }
    }, [print.images]);

    const pills = [
        { 'title': 'Ender-3' },
        { 'title': print.filament_material.name },
        { 'title': print.filament_brand.name },
        { 'title': print.filament_colour.name },
        { 'title': '20% infill' },
        { 'title': 'Tree supports' },
        { 'title': 'Tag' },
        { 'title': 'Another tag' },
        { 'title': 'Yet another tag' },
    ];

    const images = print.images.map((image) => image.url);

    const buttonPressed = () => {
        navigation.navigate('Thingiverse');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Horizontal ScrollView for Images */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ height: 300, width:300, aspectRatio: aspectRatio }}
                    />
                ))}
            </ScrollView>

            <Text className={"text-center text-2xl mt-5 font-bold"}>{print.title}</Text>

            <View className={'my-5'}>
                <Text className={'mb-4'}>{print.description}</Text>
            </View>

            <PillGroup pills={pills} />

            <View style={styles.divider} />

            <View className={"my-5 w-full m-auto"}>
                <InfoCard />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    descriptionContainer: {
        marginVertical: 20,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#DFE4EA',
        marginVertical: 20,
    },
});

export default PrintedDesign;
