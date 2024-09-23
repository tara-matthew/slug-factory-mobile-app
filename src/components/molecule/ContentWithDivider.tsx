import React, {ReactNode, useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";

type ContentWithDivider = {
    top: boolean;
    bottom: boolean;
    outerClass?: string;
    innerClass?: string;
    children: ReactNode;
};
const ContentWithDivider = (props: ContentWithDivider) => {
    return (
        <View className={props.outerClass}>
            {props.top && <View style={ styles.divider } />}

            <View className={props?.innerClass}>
                { props.children }
            </View>
            {props.bottom && <View style={ styles.divider } />}

        </View>
    );
};

const styles = StyleSheet.create({
    divider: {
        width: "50%",
        height: 1,
        backgroundColor: "gray",
    },
});

export default ContentWithDivider;
