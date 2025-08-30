import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";

import Divider from "../../components/atom/Divider";
import {DividerWidth} from "../../contracts/Divider";

const meta = {
    title: "Atom/Divider",
    component: Divider,
    decorators: [
        Story => (
            <View className={"flex w-1/2"}>
                <Story />
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HalfWidth = {
    args: {
        width: DividerWidth.Half,
    },
};

export const FullWidth = {
    args: {
        width: DividerWidth.Full,
    },
};
