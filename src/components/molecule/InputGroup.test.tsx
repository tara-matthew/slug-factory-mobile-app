import React from "react";
import { render } from "@testing-library/react-native";
import InputGroup from "./InputGroup";

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

    const {toJSON} = render(<InputGroup  inputs={inputs} sendDataToParent={mockSendDataToParent} />);
    expect(toJSON()).toMatchSnapshot();

});

it("displays all fields correctly", () => {
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

    const {getByText, getByPlaceholderText} = render(<InputGroup  inputs={inputs} sendDataToParent={mockSendDataToParent} />);

    const placeholders = [getByPlaceholderText("First placeholder"), getByPlaceholderText("Second placeholder"), getByPlaceholderText("Third placeholder")];
    placeholders.forEach(placeholder => expect(placeholder).toBeTruthy());

    const inputTexts = [getByText("First input"), getByText("Second input"), getByText("Third input")];
    inputTexts.forEach(input => expect(input).toBeTruthy());
})
