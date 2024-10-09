import React from "react";
import renderer from "react-test-renderer";
import Card from './Card';

test('renders correctly', () => {
    // jest.mock('@expo/vector-icons', () => 'Icon')
    const item =
        {
            images: [
                {
                    id: 1,
                    url: 'test'
                }
            ]
        }

    // console.log(item);
    const tree = renderer.create(<Card item={item} />).toJSON();
    expect(tree).toMatchSnapshot();
});
