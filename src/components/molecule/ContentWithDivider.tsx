import React, { ReactNode } from "react";
import { View } from "react-native";
import Divider from "../atom/Divider";

type ContentWithDivider = {
    top: boolean;
    bottom: boolean;
    outerClass?: string;
    innerClass?: string;
    children: ReactNode;
    dividerWidth: string; // todo make an enum
};
const ContentWithDivider = (props: ContentWithDivider) => {
    return (
        <View className={ props.outerClass }>
            {props.top && <Divider width={ props.dividerWidth } />}

            <View className={ props?.innerClass }>
                { props.children }
            </View>
            {props.bottom && <Divider width={ props.dividerWidth } />}

        </View>
    );
};

export default ContentWithDivider;
