import React from "react";
import InfoCard from "./InfoCard";
import { render, fireEvent, screen } from "@testing-library/react-native";

it("renders correctly", () => {
    const { toJSON } = render(<InfoCard imageUrl="/prints/1" info={["some info", "some more info"]} name="Test name" uploadText="Upload text"/>);

    expect(toJSON()).toMatchSnapshot();
});

it.todo("displays an image");
it.only("does not render a divider on the bottom of the last info item", () => {
    const {getByText} = render(<InfoCard imageUrl="/prints/1" info={["some info", "other info", "some more info"]} name="Test name" uploadText="Upload text"/>)
    const lastItem = getByText('some more info');
    const firstItem = getByText("some info");

    let lastItemParent = lastItem.parent;

    while (lastItemParent && lastItemParent.type?.name !== 'ContentWithDivider') {
        lastItemParent = lastItemParent.parent;
    }

    let firstItemParent = firstItem.parent;

    while (firstItemParent && firstItemParent.type?.name !== 'ContentWithDivider') {
        firstItemParent = firstItemParent.parent;
    }

    // check that the last item does not have a divider on the bottom
    expect(lastItemParent).not.toBeNull();
    expect(lastItemParent.props.bottom).toBe(false);
    // check that an item which isn't the last one does have a divider on the bottom
    expect(firstItemParent).not.toBeNull();
    expect(firstItemParent.props.bottom).toBe(true);

});
