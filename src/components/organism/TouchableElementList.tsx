import React from "react";
import { View } from "react-native";
import TouchableLink from "../molecule/TouchableLink";
import { ITouchableElementListProps, ITouchableLinkProps } from "../../contracts/TouchableLink";

const TouchableElementList = ({ items }: ITouchableElementListProps) => {
    return (
        <View>
            {items.map((item: ITouchableLinkProps, index: number) => (
                <TouchableLink to={ item.to } title={ item.title } key={ index } />
            ))}
        </View>
    );
};

export default TouchableElementList;
