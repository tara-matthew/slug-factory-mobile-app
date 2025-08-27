import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";

import BaseButton from "../components/atom/BaseButton";

const meta = {
    title: "BaseButton",
    component: BaseButton,
    decorators: [
        Story => (
            <View className="w-1/3">
                <Story />
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Disabled = {
    args: {
        title: "Button",
        isDisabled: true,
    },
};

export const Enabled = {
    args: {
        title: "Button",
        isDisabled: false,
    },
};
