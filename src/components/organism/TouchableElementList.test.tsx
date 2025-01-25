import React from "react";
import { render } from "@testing-library/react-native";
import TouchableElementList from "./TouchableElementList";

it("renders correctly", () => {
    const profileMock = jest.fn();

    const items = [
        {
            to: profileMock,
            title: "My profile",
        },
        {
            to: profileMock,
            title: "Edit profile",
        },
        {
            to: profileMock,
            title: "My prints",
        },
    ];
    const { toJSON } = render(<TouchableElementList items={ items } />);
    expect(toJSON()).toMatchSnapshot();
});

it.todo("displays the correct text");
