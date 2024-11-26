import { render } from "@testing-library/react-native";
import React from "react";
import StorePrint from "./StorePrint";
import { UserProvider } from "../contexts/UserContext";

// TODO will be able to remove this later when things are properly atomic
it("Renders correctly", () => {
    const component = render(
        <UserProvider>
            <StorePrint />
        </UserProvider>,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
