import { IInputWithLabel } from "./InputWithLabel";

export interface IFormProps {
    inputs: IInputWithLabel[];
    buttonText: string;
    sendDataToParent: (data: { [value: string]: string }) => void;
}
