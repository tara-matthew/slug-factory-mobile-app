import { render, screen } from '@testing-library/react-native';
import Form from "./Form";
import Pill from "../atom/Pill";

it('Displays the correct inputs', () => {
    const inputs = [
        {
            placeholder: 'First placeholder'
        },
        {
            placeholder: 'Second placeholder'
        },
        {
            placeholder: 'Third placeholder'
        }
    ]
    const buttonText = 'Click me'
    const buttonTo = "To link"
    const {getByPlaceholderText} = render(<Form inputs={inputs} buttonText={buttonText} buttonTo={buttonTo} />);
    const placeholders = [getByPlaceholderText('First placeholder'), getByPlaceholderText('Second placeholder'), getByPlaceholderText('Third placeholder')];
    placeholders.forEach((placeholder) => expect(placeholder).toBeTruthy());
})

it.todo('Sends data when the button is clicked')

