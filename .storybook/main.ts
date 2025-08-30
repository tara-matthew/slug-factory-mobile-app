import type { StorybookConfig } from "@storybook/react-native-web-vite";
import path from "path";

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    viteFinal: async (config, { configType }) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@react-navigation/native": "/src/stories/mocks/nav.ts",
        };
        return config;
    },
    addons: [
        "@storybook/addon-docs",
    ],
    framework: {
        name: "@storybook/react-native-web-vite",
        options: {
            pluginReactOptions: {
                jsxImportSource: "nativewind",
            },
        },
    },
};
export default config;
