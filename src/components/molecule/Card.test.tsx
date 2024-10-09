import React from "react";
import renderer from "react-test-renderer";
import Card from "./Card";

test("renders correctly", () => {
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
