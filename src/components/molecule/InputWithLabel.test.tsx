import React from "react";
import { render } from "@testing-library/react-native";
import InputWithLabel from "./InputWithLabel";

it("renders correctly", () => {
    const mockSendDataToParent = jest.fn();
    const { toJSON } = render(<InputWithLabel isMultiline placeholder="placeholder" sendDataToParent={ mockSendDataToParent } title="title" />);

    expect(toJSON()).toMatchSnapshot();
});

it.todo("renders the correct title class");
it.todo("renders the correct styling depending on whether the input is multiline");
