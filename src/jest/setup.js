jest.mock("@react-navigation/native", () => {
    return {
        ...jest.requireActual("@react-navigation/native"),
        useNavigation: jest.fn(() => ({})),
    };
});

jest.mock("expo-image", () => {
    const { Image } = require("react-native");
    return { Image };
});

jest.mock("expo-image-picker", () => ({
    launchImageLibraryAsync: jest.fn().mockResolvedValue({
        cancelled: false,
        assets: [{ uri: "mock-image-uri" }],
    }),
    launchCameraAsync: jest.fn().mockResolvedValue({
        cancelled: false,
        assets: [{ uri: "mock-image-uri" }],
    }),
    MediaTypeOptions: {
        Images: "Images",
        Videos: "Videos",
        All: "All",
    },
}));

jest.mock("expo-image-manipulator", () => ({
    manipulateAsync: jest.fn().mockResolvedValue({
        uri: "mock-manipulated-image-uri",
        width: 100,
        height: 100,
        base64: null,
    }),
}));

// jest.mock('../../src/contexts/UserContext', () => ({
//     useUser: jest.fn(),
// }));

const mockUser = { id: 1, name: "Test User" };
const mockSetUser = jest.fn();
