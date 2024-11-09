import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PillGroup from "../components/molecule/PillGroup";
import InfoCard from "../components/molecule/InfoCard";
import ImageList from "../components/molecule/ImageList";
import { Size } from "../contracts/Image";

const PrintedDesign = ({ route }) => {
    const { print } = route.params;
    console.log(print);
    const navigation = useNavigation();

    const pills = [
        { title: "Ender-3" },
        { title: print.filament_material.name },
        { title: print?.filament_brand?.name ?? "A brand" },
        { title: print?.filament_colour?.name ?? "A colour" },
        { title: "20% infill" },
        { title: "Tree supports" },
        { title: "Tag" },
        { title: "Another tag" },
        { title: "Yet another tag" },
    ];

    return (
        <ScrollView style={ { width: "100%" } }>
            <View style={ styles.imageContainer }>
                <ImageList images={ print.images } size={ Size.Large } />
            </View>

            <View style={ styles.container }>
                <Text className="text-center text-2xl mt-5 font-bold">{print.title}</Text>

                <View className="my-5">
                    <Text className="mb-4">{print.description}</Text>
                </View>

                <PillGroup pills={ pills } />

                <View style={ styles.divider } />

                <View className="my-5 w-full m-auto">
                    <InfoCard
                        imageUrl="https://avatars.githubusercontent.com/u/97165289"
                        name="Tara"
                        uploadCount={ 10 }
                        info={ ["Thingiverse", "21/8/2024", "Printed 3 times", "4 reviews"] }

                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        // paddingVertical: 20,
        paddingHorizontal: 15,
    },
    imageContainer: {
        // height: 400
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#DFE4EA",
    },
});

export default PrintedDesign;
