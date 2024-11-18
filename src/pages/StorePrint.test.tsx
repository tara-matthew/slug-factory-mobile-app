import { render } from "@testing-library/react-native";
import Form from "./Form";
import React from "react";
import renderer from "react-test-renderer";
import Card from "../components/molecule/Card";
import StorePrint from "./StorePrint";
import {UserProvider, UserContext} from "../contexts/UserContext";

// TODO will be able to remove this later when things are properly atomic
it('Renders correctly', () => {

    const component = render(
        <UserProvider>
            <StorePrint />
        </UserProvider>
    )

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
