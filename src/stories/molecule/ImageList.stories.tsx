import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { ScrollView, View } from "react-native";

import ImageList from "../../components/molecule/ImageList";
import { Size } from "../../contracts/Image";

const meta = {
    title: "Molecule/ImageList",
    component: ImageList,
    decorators: [
        (Story, { args }) => {
            switch (args.size) {
                case Size.Small:
                    return (
                        <ScrollView className="w-1/3">
                            <View>
                                <Story />
                            </View>
                        </ScrollView>
                    )
                case Size.Large:
                    return (
                        <ScrollView className="w-full">
                            <View>
                                <Story />
                            </View>
                        </ScrollView>
                    )
                default:
                    return <Story />
            }
        },
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof ImageList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
    args: {
        size: Size.Small,
        images: [
            {
                url: "https://picsum.photos/640/480?random=10547",
                blurhash: "9a13088d429cb5668789fc5f886593723f9f21296561bfb54977fc2b792065ef",
            },
            {
                url: "https://picsum.photos/640/480?random=62432",
                blurhash: "3b051ecc212cb03f0314f288af64162ac8e84bf9ea9f082e541cea9ef00ab757",
            },
            {
                url: "https://picsum.photos/640/480?random=42972",
                blurhash: "27eff35dd69b56674745736b130b584fb93f7c50408e7db89f1f4d5fb2a8d6b2",
            },
            {
                url: "https://picsum.photos/640/480?random=10547",
                blurhash: "9a13088d429cb5668789fc5f886593723f9f21296561bfb54977fc2b792065ef",
            },
            {
                url: "https://picsum.photos/640/480?random=62432",
                blurhash: "3b051ecc212cb03f0314f288af64162ac8e84bf9ea9f082e541cea9ef00ab757",
            },
        ],
    },
};

export const Large: Story = {
    args: {
        size: Size.Large,
        images: [
            {
                url: "https://picsum.photos/640/480?random=10547",
                blurhash: "9a13088d429cb5668789fc5f886593723f9f21296561bfb54977fc2b792065ef",
            },
            {
                url: "https://picsum.photos/640/480?random=62432",
                blurhash: "3b051ecc212cb03f0314f288af64162ac8e84bf9ea9f082e541cea9ef00ab757",
            },
            {
                url: "https://picsum.photos/640/480?random=42972",
                blurhash: "27eff35dd69b56674745736b130b584fb93f7c50408e7db89f1f4d5fb2a8d6b2",
            },
            {
                url: "https://picsum.photos/640/480?random=10547",
                blurhash: "9a13088d429cb5668789fc5f886593723f9f21296561bfb54977fc2b792065ef",
            },
            {
                url: "https://picsum.photos/640/480?random=62432",
                blurhash: "3b051ecc212cb03f0314f288af64162ac8e84bf9ea9f082e541cea9ef00ab757",
            },
        ],
    },
};
