import React from "react";
import { render } from "@testing-library/react-native";
import LoadingSpinner from "./LoadingSpinner";

it("renders correctly", () => {
    const { toJSON } = render(<LoadingSpinner />);
    expect(toJSON()).toMatchSnapshot();
});
