import Divider from "./Divider";
import React from "react";
import renderer from "react-test-renderer";

it("Renders correctly", () => {
    const widths = ["half", "full"];

    widths.forEach((width) => {
        const tree = renderer.create(<Divider width={ width } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
