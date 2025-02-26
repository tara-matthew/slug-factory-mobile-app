import React, { memo } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { ICardProps } from "../../contracts/Card";
import { Image } from "expo-image";

const Card = ({ item, imageURL, blurhash, sendDataToParent }: ICardProps) => {
    const height = 200;

    const uri = imageURL.startsWith("https") ? imageURL : `${process.env.EXPO_PUBLIC_URL}/${imageURL}`;
    const buttonPressed = (item: { title: string }) => {
        sendDataToParent(item);
    };

    return (
        <View style={ [styles.container] }>
            <Pressable
                accessibilityRole="button"
                onPress={ () => buttonPressed(item) }
            >
                <View className="relative">
                    <Image
                        placeholder={ { blurhash } }
                        transition={ 1000 }
                        style={ {
                            width: "100%",
                            height: height,
                        } }
                        source={ {
                            uri: uri,
                        } }
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
    },
});

export default memo(Card);
