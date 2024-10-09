module.exports = {
    preset: "react-native",
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|@expo|expo-font|expo-modules-core)/)', // Add any other libraries if necessary
    ],
    transform: {
        // 'node_modules/(?!(react-native|@react-native|@expo/vector-icons)/)': 'ts-jest', // Add any other libraries if necessary
    },
    moduleNameMapper: {
        // This regex matches any imports from '@expo/vector-icons/*'
        '^@expo/vector-icons/(.*)$': '<rootDir>/mocks/expo-vector-icons.js',
        '^@expo/vector-icons$': '<rootDir>/mocks/expo-vector-icons.js',
    },
    setupFilesAfterEnv: ["./node_modules/@testing-library/jest-native/extend-expect"],
    "setupFiles": ["<rootDir>/jest/setup.js"]
    // transformIgnorePatterns: ["/node_modules/(?!(@browserfs)/)"],
};
