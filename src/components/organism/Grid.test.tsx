import React from "react";
import renderer from "react-test-renderer";
import Grid from "./Grid";
it("Renders correctly", () => {
    const prints = [
        {
            created_at: "2024-09-16T14:21:07.000000Z",
            description: "test",
            filament_brand: {

            },
            filament_colour: {

            },
            filament_material: {

            },
            id: 2000,
            images: [
                {
                    id: 1,
                    url: "test-url.com",
                },
            ],
            infill_percentage: null,
            title: "Gorgeous Concrete Shoes ",
            type: "PrintedDesign",
            user_id: 2001,
            is_favourite: false,
        },
    ];
    const tree = renderer.create(<Grid items={ prints } />).toJSON();
    expect(tree).toMatchSnapshot();
});

it.todo("Displays the correct number of items");
