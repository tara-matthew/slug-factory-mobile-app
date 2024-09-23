import React, { useEffect } from "react";
import ContentWithDivider from "./ContentWithDivider";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface ITouchableLinkProps {
    title: string;
    to: never;
}

const TouchableLink = (props: ITouchableLinkProps) => {
    useEffect(() => {
        // console.log(typeof props.to)
    }, []);
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={ () => navigation.navigate(props.to) }
        >
            <ContentWithDivider top={ false } bottom={ true } innerClass="flex flex-row justify-between items-center w-full" dividerWidth="full">
                <Text className="py-5 px-10 text-lg">{props.title}</Text>
                <MaterialIcons name="chevron-right" size={ 20 } />
            </ContentWithDivider>
        </TouchableOpacity>
    );
};

export default TouchableLink;
