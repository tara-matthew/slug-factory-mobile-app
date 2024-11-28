import React from "react";
import Card from "./Card";
import { render, fireEvent, screen } from "@testing-library/react-native";

it("renders correctly", () => {
    const mockSendDataToParent = jest.fn();
    const blurhash
        = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
    const item
        = {
            title: "A card",

            images: [
                {
                    id: 1,
                    url: "test",
                },
            ],
        };

    const { toJSON } = render(<Card item={ item } blurhash={ blurhash } sendDataToParent={ mockSendDataToParent } imageURL="https://test.com" />);

    expect(toJSON()).toMatchSnapshot();
});
it("displays text", () => {
    const item
        = {
            title: "A card",
            images: [
                {
                    id: 1,
                    url: "test-url.com'",
                },
            ],
        };

    const mockSendDataToParent = jest.fn();
    const blurhash
        = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

    const { getByText } = render(<Card item={ item } blurhash={ blurhash } imageURL="https://test-url.com" sendDataToParent={ mockSendDataToParent } />);

    expect(getByText("A card")).toBeTruthy();
});

it("sends the item data when the card is pressed", () => {
    const item
        = {
            title: "A card",
            images: [
                {
                    id: 1,
                    url: "test-url.com'",
                },
            ],
        };

    const mockSendDataToParent = jest.fn();
    const blurhash
        = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

    render(<Card item={ item } blurhash={ blurhash } imageURL="https://test-url.com" sendDataToParent={ mockSendDataToParent } />);

    const button = screen.getByRole("button");
    fireEvent.press(button);
    expect(mockSendDataToParent).toHaveBeenCalledTimes(1);
    expect(mockSendDataToParent).toHaveBeenCalledWith(item);
});
