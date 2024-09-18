import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    plugins: {
      "unused-imports": unusedImports,
      '@stylistic/js': stylisticJs
    },
    rules: {
      "indent": ["error", 4],
      "no-unused-vars": "error",
      "unused-imports/no-unused-imports": "error",
      "no-undef": "error",
      "@stylistic/js/object-curly-spacing": ['error', 'always']
    }
  },
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

];
