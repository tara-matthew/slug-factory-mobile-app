import React, { useEffect } from "react";
import ContentWithDivider from "./ContentWithDivider";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ITouchableLinkProps } from "../../contracts/TouchableLink";
import { DividerWidth } from "../../contracts/Divider";

const TouchableLink = ({ to, title }: ITouchableLinkProps) => {
    useEffect(() => {
        // console.log(typeof props.to)
    }, []);
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={ () => navigation.navigate(to) }
        >
            <ContentWithDivider top={ false } bottom={ true } innerClass="flex flex-row justify-between items-center w-full" dividerWidth={ DividerWidth.Full }>
                <Text className="py-5 px-10 text-lg">{title}</Text>
                <MaterialIcons name="chevron-right" size={ 20 } />
            </ContentWithDivider>
        </TouchableOpacity>
    );
};

export default TouchableLink;
