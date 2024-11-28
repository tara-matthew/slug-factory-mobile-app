import React from "react";
import { render } from "@testing-library/react-native";
import LoadingSpinner from "./LoadingSpinner";

jest.useFakeTimers();

describe("LoadingSpinner", () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    it("renders correctly", () => {
        const { toJSON } = render(<LoadingSpinner />);
        expect(toJSON()).toMatchSnapshot();
    });

    it("renders an ActivityIndicator", async () => {
        const { getByRole } = render(<LoadingSpinner />);

        const spinner = getByRole("progressbar");
        expect(spinner).toBeTruthy();
    });
});
