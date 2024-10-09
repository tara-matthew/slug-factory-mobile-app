jest.mock("@react-navigation/native", () => {
    return {
        ...jest.requireActual("@react-navigation/native"),
        useNavigation: jest.fn(() => ({})),
    };
});
