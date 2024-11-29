import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ContentWithDivider from "./ContentWithDivider";
import { DividerWidth } from "../../contracts/Divider";
import { IInfoCardProps } from "../../contracts/InfoCard";

const InfoCard = ({ name, uploadText, imageUrl, info }: IInfoCardProps) => {
    return (
        <View style={ styles.container } className="rounded-lg shadow-sm p-8">
            <View className="flex flex-row items-center">
                <View className="justify-center items-center">
                    <Image
                        style={ {
                            width: 75,
                            height: 75,
                            borderRadius: 75,
                            marginBottom: 8,
                        } }
                        resizeMode="cover"
                        source={ {
                            uri: imageUrl,
                        } }
                    />

                    <Text
                        className="text-xl font-bold text-center"
                        style={ { maxWidth: 120, textAlign: "center" } }
                        numberOfLines={ 1 }
                    >
                        {name}
                    </Text>

                    <Text
                        className="text-lg text-center"
                        style={ { maxWidth: 120, textAlign: "center" } }
                    >
                        {uploadText}
                    </Text>
                </View>

                <View className="flex-1 flex flex-col">
                    {info.map((item, index) => {
                        const isLast = index === info.length - 1;

                        return (
                            <ContentWithDivider
                                outerClass="items-end"
                                key={ index }
                                top={ false }
                                bottom={ !isLast }
                                dividerWidth={ DividerWidth.Half }
                            >
                                <Text
                                    numberOfLines={ 1 }
                                    style={ { maxWidth: 160 } }
                                    className="text-lg py-2"
                                >
                                    {item}
                                </Text>

                            </ContentWithDivider>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#d0cadb", // '#e8e8e8', //"#e8eaeb",
    },
    divider: {
        width: "50%",
        height: 1,
        backgroundColor: "gray",
    },
});

export default InfoCard;
