import React, {ReactNode, useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";

type ContentWithDivider = {
    top: boolean;
    bottom: boolean;
    // text: string;
    class?: string;
    children: ReactNode;
};
const ContentWithDivider = (props: ContentWithDivider) => {
    return (
        <View className={ props?.class }>
            {props.top && <View style={ styles.divider } />}
            { props.children }
            {props.bottom && <View style={ styles.divider } />}
        </View>
    );
};

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "gray",
    },
});

export default ContentWithDivider;
