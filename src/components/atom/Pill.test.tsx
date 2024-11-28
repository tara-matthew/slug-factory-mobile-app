import { render } from "@testing-library/react-native";
import Pill from "./Pill";
import React from "react";

it("renders correctly", () => {
    const { toJSON } = render(<Pill title="A pill" />);
    expect(toJSON()).toMatchSnapshot();
});

it("displays the correct title", () => {
    const { getByText } = render(<Pill title="test title" />);
    const title = getByText("test title");
    expect(title).toBeTruthy();
});

it.todo("Goes to the correct screen when tapped");
