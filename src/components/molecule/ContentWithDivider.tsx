import React from "react";
import { View } from "react-native";
import Divider from "../atom/Divider";
import { IContentWithDivider } from "../../contracts/Divider";

const ContentWithDivider = (props: IContentWithDivider) => {
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
