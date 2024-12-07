import {IInputWithLabel} from "./InputWithLabel";

export interface IWelcomeProps {
    headerText: string;
    buttonText: string;
    buttonTo: string;
    inputs: IInputWithLabel[];
    sendDataToParent: (data: never) => void;
}

export interface IInput {
    placeholder: string;
    title: string;
    inputProps: IInputProps;
}

export interface IInputProps {
    autoCapitalize?: string;
    secureTextEntry?: boolean;
}
