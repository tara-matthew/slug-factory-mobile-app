import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import stylistic from "@stylistic/eslint-plugin";

export default [
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
    }),
    {
        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            "unused-imports": unusedImports,
            "@stylistic": stylistic,
        },
        rules: {
            "no-unused-vars": "error",
            "unused-imports/no-unused-imports": "error",
            "no-undef": "error",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/jsx-curly-spacing": ["error", "always"],
            "@stylistic/brace-style": ["error", "1tbs"],

        },
    },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,

];
