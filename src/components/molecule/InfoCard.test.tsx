import React from "react";
import InfoCard from "./InfoCard";
import { render } from "@testing-library/react-native";

it("renders correctly", () => {
    const { toJSON } = render(<InfoCard imageUrl="/prints/1" info={ ["some info", "some more info"] } name="Test name" uploadText="Upload text" />);

    expect(toJSON()).toMatchSnapshot();
});

it("displays the correct text", () => {
    const { getByText } = render(<InfoCard imageUrl="/prints/1" info={ ["Some info", "Other info", "Some more info"] } name="Test name" uploadText="Upload text" />);

    expect(getByText("Some info")).toBeTruthy();
    expect(getByText("Other info")).toBeTruthy();
    expect(getByText("Some more info")).toBeTruthy();
    expect(getByText("Test name")).toBeTruthy();
    expect(getByText("Upload text")).toBeTruthy();
});

it.todo("displays an image");
it("does not render a divider on the bottom of the last info item", () => {
    const { getByText } = render(<InfoCard imageUrl="/prints/1" info={ ["Some info", "Other info", "Some more info"] } name="Test name" uploadText="Upload text" />);
    const contentWithDivider = "ContentWithDivider";
    const lastItem = getByText("Some more info");
    const firstItem = getByText("Some info");

    const lastItemParent = findParentWithType(lastItem, contentWithDivider);
    const firstItemParent = findParentWithType(firstItem, contentWithDivider);

    // check that the last item does not have a divider on the bottom
    expect(lastItemParent).not.toBeNull();
    expect(lastItemParent.props.bottom).toBe(false);

    // check that an item which isn't the last one does have a divider on the bottom
    expect(firstItemParent).not.toBeNull();
    expect(firstItemParent.props.bottom).toBe(true);
});

// find the correct parent
// perhaps a bit brittle, but ensures we find the parent
const findParentWithType = (element, typeName) => {
    let parent = element.parent;
    while (parent && parent.type?.name !== typeName) {
        parent = parent.parent;
    }
    return parent;
};
