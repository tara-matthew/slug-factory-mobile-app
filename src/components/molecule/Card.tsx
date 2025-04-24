import React, { memo } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { ICardProps } from "../../contracts/Card";
import { Image } from "expo-image";

const Card = ({ item, imageURL, blurhash, sendDataToParent }: ICardProps) => {
    const height = 200;

    // TODO add a variant for full width vs other width?

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
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        } }
                        source={ {
                            uri: uri,
                        } }
                    />
                    <View style={ { height: 50, flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 8, paddingVertical: 8 } }>
                        <Text
                            adjustsFontSizeToFit={ false }
                            numberOfLines={ 1 }
                            style={ { fontSize: 18 } }
                        >
                            {item.title}
                        </Text>
                        {item.extraData && (
                            <Text adjustsFontSizeToFit={ false } numberOfLines={ 1 } style={ { fontSize: 13 } }>{item.extraData}</Text>
                        )}
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: "#d0cadb",
        marginBottom: 20,
        shadowRadius: 2,
        borderRadius: 8,
        // maxWidth: "50%",
    },
    icon: {
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3,
    },
});

export default memo(Card);
