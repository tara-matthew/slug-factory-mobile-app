import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Text, View } from "react-native";

import TouchableLink from "../../components/molecule/TouchableLink";
import React from "react";

const meta = {
    title: "Molecule/TouchableLink",
    component: TouchableLink,
    decorators: [
        Story => (
            <View style={ { flex: 1, alignItems: "flex-start" } }>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof TouchableLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        to: () => <Text className="text-lg">Hello from render prop</Text>,
        title: "A link"
    },
    render: args => (
            <TouchableLink {...args}></TouchableLink>
    )
};
