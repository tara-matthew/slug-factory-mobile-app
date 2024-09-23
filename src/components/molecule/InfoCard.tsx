import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ContentWithDivider from "./ContentWithDivider";

type InfoCardProps = {
    imageUrl: string;
    name: string;
    uploadCount: number;
    info: Array<string>;
};

const InfoCard = (props: InfoCardProps) => {
    useEffect(() => {
        props.info.map((item, index) => {
            console.log(item);
        });
    }, []);

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
                            uri: props.imageUrl,
                        } }
                    />

                    <Text
                        className="text-xl font-bold text-center"
                        style={ { maxWidth: 120, textAlign: "center" } }
                        numberOfLines={ 1 }
                    >
                        {props.name}
                    </Text>

                    <Text
                        className="text-lg text-center"
                        style={ { maxWidth: 120, textAlign: "center" } }
                    >
                        {props.uploadCount}
                        {" "}
                        uploads
                    </Text>
                </View>

                <View className="flex-1 flex flex-col">
                    {props.info.map((item, index) => {
                        const isLast = index === props.info.length - 1;

                        return (
                            <ContentWithDivider
                                outerClass="items-end"
                                key={ index }
                                top={ false }
                                bottom={ !isLast }
                                dividerWidth="half"
                            >
                                <Text className="text-lg py-2">{item}</Text>

                            </ContentWithDivider>
                        );
                    })}
                    {/* <TouchableOpacity> */}
                    {/*    <Text className={'text-xl font-bold pb-2'}>Thingiverse</Text> */}
                    {/* </TouchableOpacity> */}
                    {/* <View style={styles.divider}></View> */}

                    {/* <Text className={"text-lg py-2"}>21/8/2024</Text> */}
                    {/* <View style={styles.divider}></View> */}

                    {/* <Text className={"text-lg py-2"}>Printed 3 times</Text> */}
                    {/* <View style={styles.divider}></View> */}

                    {/* <Text className={"text-lg py-2"}>4 reviews</Text> */}
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
