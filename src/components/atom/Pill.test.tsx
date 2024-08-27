import { render, screen } from '@testing-library/react-native';
import Pill from "./Pill";
import {ReactTestInstance} from "react-test-renderer";

it('displays the correct title', () => {
    const {getByText} = render(<Pill title={'test title'} />);
    const title = getByText('test title');
    expect(title).toBeTruthy();
});

