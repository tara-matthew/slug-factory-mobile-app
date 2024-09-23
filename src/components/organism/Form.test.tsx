import { render } from "@testing-library/react-native";
import Form from "./Form";

it("Displays the correct inputs", () => {
    const inputs = [
        {
            placeholder: "First placeholder",
        },
        {
            placeholder: "Second placeholder",
        },
        {
            placeholder: "Third placeholder",
        },
    ];
    const buttonText: string = "Click me";
    const buttonTo: string = "To link";
    const { getByPlaceholderText } = render(<Form inputs={ inputs } buttonText={ buttonText } buttonTo={ buttonTo } />);
    const placeholders = [getByPlaceholderText("First placeholder"), getByPlaceholderText("Second placeholder"), getByPlaceholderText("Third placeholder")];
    placeholders.forEach(placeholder => expect(placeholder).toBeTruthy());
});

it.todo("Sends data when the button is clicked");
