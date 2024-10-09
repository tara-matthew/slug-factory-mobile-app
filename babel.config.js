module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind", modules: 'commonjs' }],
            "nativewind/babel",
            // '@babel/preset-typescript',

        ],
        env: {
            test: {
                presets: [["babel-preset-expo", { modules: "commonjs" }]], // Transpile to CommonJS for Jest
            },
        },
    };
};
