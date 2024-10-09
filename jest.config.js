module.exports = {
    preset: "react-native",
    transformIgnorePatterns: [
        // 'node_modules/(?!(react-native|@react-native|@expo|expo-font|expo-modules-core)/)', // Add any other libraries if necessary
    ],
    moduleNameMapper: {
        "^@expo/vector-icons$": "<rootDir>/src/mocks/expo-vector-icons.js",
    },
    setupFilesAfterEnv: ["./node_modules/@testing-library/jest-native/extend-expect"],
    setupFiles: ["<rootDir>/src/jest/setup.js"],
};
