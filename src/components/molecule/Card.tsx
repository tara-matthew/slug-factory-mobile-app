import React, {memo, useMemo} from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { ICardProps } from "../../contracts/Card";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";

const Card = ({ item, imageURL, blurhash, sendDataToParent }: ICardProps) => {
    const height = 200;

    // TODO add a variant for full width vs other width?

    const uri = imageURL.startsWith("https") ? imageURL : `${process.env.EXPO_PUBLIC_URL}/${imageURL}`;
    const buttonPressed = (item: { title: string }) => {
        sendDataToParent(item);
    };

    const iconColour = useMemo(() => {
        return item.contains_item ? "red" : "white";
    }, [item.contains_item]);

    const iconOpacity = useMemo(() => {
        return item.contains_item ? 1 : 0.8;
    }, [item.contains_item]);

    return (
        <View style={ [styles.container] }>
            <Pressable
                accessibilityRole="button"
                onPress={ () => buttonPressed(item) }
            >
                <View className="relative bg-transparent">
                    {item.contains_item !== undefined && (
                        <MaterialIcons
                            name="favorite"
                            size={ 32 }
                            color={ iconColour }
                            style={ { opacity: iconOpacity } }
                            className="absolute top-2 right-2 z-10"
                        />
                    )}
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
