import React, { memo } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ICardProps } from "../../contracts/Card";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../contracts/Navigator";
import { Image } from "expo-image";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;

const Card = ({ item, imageURL, blurhash, sendDataToParent }: ICardProps) => {
    const height = 200;

    const uri = imageURL.startsWith("https") ? imageURL : `${process.env.EXPO_PUBLIC_URL}/${imageURL}`;
    const buttonPressed = (item) => {
        sendDataToParent(item);
        // console.log("pressed", item);
        // navigation.navigate("PrintedDesign", { print: item });
    };

    return (
        <View style={ [styles.container] }>
            <Pressable
                onPress={ () => buttonPressed(item) }
            >
                <View className="relative">
                    <Image
                        placeholder={ { blurhash } }
                        transition={ 1000 }
                        style={ {
                            width: "100%",
                            height: height,
                            // resizeMode: "center",
                        } }
                        source={ {
                            uri: uri,
                        } }
                    />
                    <MaterialIcons
                        name="favorite-outline"
                        size={ 32 }
                        color="white"
                        style={ styles.icon }
                        className="absolute top-1 right-2"
                    />

                    <Text adjustsFontSizeToFit={ true } numberOfLines={ 2 } style={ { height: 50, fontSize: 18, padding: 8 } }>{item.title}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d0cadb",
        marginBottom: 20,
        shadowRadius: 2,
    },
    icon: {
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3,
        // opacity: 5
        // backgroundColor: 'rgba(0, 0, 0, 0.5)'
        // backgroundColor: 'red',
    },
});

export default memo(Card);
