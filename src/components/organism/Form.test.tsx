import { render } from "@testing-library/react-native";
import Form from "./Form";
import React from "react";

it("renders correctly", () => {
    const mockSendDataToParent = jest.fn();
    const inputs = [
        {
            title: "First input",
            placeholder: "First placeholder",
            isMultiline: false,
        },
        {
            title: "Second input",
            placeholder: "Second placeholder",
            isMultiline: false,
        },
        {
            title: "Third input",
            placeholder: "Third placeholder",
            isMultiline: false,
        },
    ];
    const buttonText: string = "Click me";
    const buttonTo: string = "To link";
    const { toJSON } = render(<Form inputs={ inputs } buttonText={ buttonText } buttonTo={ buttonTo } sendDataToParent={ mockSendDataToParent } />);
    expect(toJSON()).toMatchSnapshot();
});

it("displays the correct inputs", () => {
    const mockSendDataToParent = jest.fn();
    const inputs = [
        {
            title: "First input",
            placeholder: "First placeholder",
            isMultiline: false,
        },
        {
            title: "Second input",
            placeholder: "Second placeholder",
            isMultiline: false,
        },
        {
            title: "Third input",
            placeholder: "Third placeholder",
            isMultiline: false,
        },
    ];

    const buttonText: string = "Click me";
    const buttonTo: string = "To link";
    const { getByPlaceholderText } = render(<Form inputs={ inputs } buttonText={ buttonText } buttonTo={ buttonTo } sendDataToParent={ mockSendDataToParent } />);
    const placeholders = [getByPlaceholderText("First placeholder"), getByPlaceholderText("Second placeholder"), getByPlaceholderText("Third placeholder")];
    placeholders.forEach(placeholder => expect(placeholder).toBeTruthy());
});

it.todo("sends data when the button is clicked");
