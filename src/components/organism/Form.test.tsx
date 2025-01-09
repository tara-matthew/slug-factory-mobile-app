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
    const { toJSON } = render(<Form inputs={ inputs } buttonText={ buttonText } sendDataToParent={ mockSendDataToParent } />);
    expect(toJSON()).toMatchSnapshot();
});

it("displays the correct inputs", () => {
    const mockSendDataToParent = jest.fn();
    const inputs = [
        {
            title: "Name",
            placeholder: "Enter name",
            isMultiline: false,
        },
        {
            title: "Email",
            placeholder: "Enter email",
            isMultiline: false,
        },
        {
            title: "Password",
            placeholder: "Enter password",
            isMultiline: false,
        },
    ];

    const buttonText: string = "Click me";
    const buttonTo: string = "To link";
    const { getByPlaceholderText, getByText } = render(<Form inputs={ inputs } buttonText={ buttonText } buttonTo={ buttonTo } sendDataToParent={ mockSendDataToParent } />);

    const placeholders = [getByPlaceholderText("Enter name"), getByPlaceholderText("Enter email"), getByPlaceholderText("Enter password")];
    placeholders.forEach(placeholder => expect(placeholder).toBeTruthy());

    const inputTexts = [getByText("Name"), getByText("Email"), getByText("Password")];
    inputTexts.forEach(input => expect(input).toBeTruthy());
});

it.todo("sends data when the button is clicked");
it.todo("populates the fields");
