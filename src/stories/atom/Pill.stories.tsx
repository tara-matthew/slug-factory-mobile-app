import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";

import Pill from "../../components/atom/Pill";

const meta = {
    title: "Atom/Pill",
    component: Pill,
    decorators: [
        Story => (
            <View className="flex justify-center items-center bg-gray-100 h-28 w-32">
                <View>
                    <Story />
                </View>
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        title: "My pill",
    },
};
