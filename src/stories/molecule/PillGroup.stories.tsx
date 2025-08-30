import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";
import { fn } from "storybook/test";

import PillGroup from "../../components/molecule/PillGroup";

const meta = {
    title: "Molecule/PillGroup",
    component: PillGroup,
    decorators: [
        Story => (
            <View className="w-1/3 p-6 bg-gray-100">
                <Story />
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof PillGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        pills: [
            {
                title: "Pill 1",
            },
            {
                title: "Pill 2",
            },
            {
                title: "Pill 3",
            },
            {
                title: "Pill 4",
            },
            {
                title: "Pill with longer text",
            },
            {
                title: "Pill with text",
            },
        ],
    },
};
