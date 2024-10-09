import { render } from "@testing-library/react-native";
import Pill from "./Pill";
import React from "react";
import renderer from "react-test-renderer";

it("Displays the correct title", () => {
    const { getByText } = render(<Pill title="test title" />);
    const title = getByText("test title");
    expect(title).toBeTruthy();
});

it("Renders correctly", () => {
    const tree = renderer.create(<Pill title="A pill" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it.todo("Goes to the correct screen when tapped");
