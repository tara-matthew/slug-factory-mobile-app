import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Text, View } from "react-native";

import TouchableLink from "../../components/molecule/TouchableLink";
import React from "react";
import MyPrints from "../../pages/MyPrints";
import MyLists from "../../pages/MyLists";

const meta = {
    title: "Molecule/TouchableLink",
    component: TouchableLink,
    argTypes: {
        to: {
            control: {type: 'select'}, // must be a selectable control
            options: ['MyPrints', 'MyLists'],
            mapping: {
                MyPrints: MyPrints,
                MyLists: MyLists
            },
        },
    },
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
        to: MyLists,
        title: "A link"
    },
    render: args => (
        <View>
            <TouchableLink {...args}></TouchableLink>
        </View>

    )
};
