import { render } from '@testing-library/react-native';
import Pill from "./Pill";

it('Displays the correct title', () => {
    const { getByText } = render(<Pill title={'test title'} />);
    const title = getByText('test title');
    expect(title).toBeTruthy();
});

it.todo('Goes to the correct screen when tapped')

