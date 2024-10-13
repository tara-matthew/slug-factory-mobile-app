import Divider from "./Divider";
import React from "react";
import renderer from "react-test-renderer";
import {DividerWidth} from "../../contracts/Divider";

it("Renders correctly", () => {
    const widths = [DividerWidth.Half, DividerWidth.Full];

    widths.forEach((width) => {
        const tree = renderer.create(<Divider width={ width } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
