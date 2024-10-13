import React from "react";
import renderer from "react-test-renderer";
import Card from "./Card";
import {render} from "@testing-library/react-native";

it("Displays text", () => {
    const item
        = {
            title: "A card",
            images: [
                {
                    id: 1,
                    url: "test-url.com'",
                },
            ],
        };

    const { getByText } = render(<Card item={item} />);
    expect(getByText("A card")).toBeTruthy();
});

it.todo("Navigates to the correct place");

it("Renders correctly", () => {
    const item
        = {
            images: [
                {
                    id: 1,
                    url: "test",
                },
            ],
        };

    const tree = renderer.create(<Card item={ item } />).toJSON();
    expect(tree).toMatchSnapshot();
});
