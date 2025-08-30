import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Text, View } from "react-native";

import ContentWithDivider from "../../components/molecule/ContentWithDivider";
import { DividerWidth } from "../../contracts/Divider";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const meta = {
    title: "Molecule/ContentWithDivider",
    component: ContentWithDivider,
    decorators: [
        Story => (
            <View className="w-1/2">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof ContentWithDivider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ChevronLink: Story = {
    args: {
        top: true,
        bottom: true,
        innerClass: "flex flex-row justify-between items-center w-full",
        dividerWidth: DividerWidth.Full,
        children: <></>,
    },
    render: args => (
        <ContentWithDivider { ...args }>
            <Text className="py-5 px-10 text-lg">Menu Item</Text>
            <MaterialIcons name="chevron-right" size={ 20 } />
        </ContentWithDivider>
    ),
};
