module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",

        ],
        // env: {
        //     test: {
        //         presets: [["babel-preset-expo", { modules: "commonjs" }]], // Transpile to CommonJS for Jest
        //     },
        // },
    };
};
