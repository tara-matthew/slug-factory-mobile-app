import React from "react";
import { render } from "@testing-library/react-native";
import BaseButton from "./BaseButton";

it("renders correctly", () => {
    const mockSendDataToParent = jest.fn();

    const { toJSON } = render(<BaseButton title="Button title" sendDataToParent={ mockSendDataToParent } />);
    expect(toJSON()).toMatchSnapshot();
});

it("displays the correct title", () => {
    const mockSendDataToParent = jest.fn();

    const { getByText } = render(<BaseButton title="Button title" sendDataToParent={ mockSendDataToParent } />);
    const title = getByText("Button title");

    expect(title).toBeTruthy();
});
