import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";

import LoadingSpinner from "../../components/atom/LoadingSpinner";

const meta = {
    title: "Atom/LoadingSpinner",
    component: LoadingSpinner,
    decorators: [
        Story => (
            <View className="w-1/3 mt-10">
                <Story />
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
    },
};
