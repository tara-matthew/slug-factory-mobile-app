import React from "react";
import PillGroup from "./PillGroup";
import { render } from "@testing-library/react-native";

const pills = [
    {
        title: "Pill 1",
    },
    {
        title: "Pill 2",
    },
    {
        title: "Pill 3",
    },
];
it("renders correctly", () => {
    const { toJSON } = render(<PillGroup pills={ pills } />);

    expect(toJSON()).toMatchSnapshot();
});

it("displays all pills with titles", () => {
    const { getByText } = render(<PillGroup pills={ pills } />);

    pills.forEach((pill) => {
        expect(getByText(pill.title)).toBeTruthy();
    });
});
