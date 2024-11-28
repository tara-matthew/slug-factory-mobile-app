import Divider from "./Divider";
import React from "react";
import { DividerWidth } from "../../contracts/Divider";
import { render } from "@testing-library/react-native";

it("renders correctly", () => {
    const widths = [DividerWidth.Half, DividerWidth.Full];

    widths.forEach((width) => {
        const { toJSON } = render(<Divider width={width} />);
        expect(toJSON()).toMatchSnapshot();
    });
});
