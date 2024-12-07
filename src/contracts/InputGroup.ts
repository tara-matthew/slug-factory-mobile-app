import {IInputWithLabel, IInputWithLabelProps} from "./InputWithLabel";

export interface IInputGroupProps {
    inputs: IInputWithLabel[];
    sendDataToParent: (name: string, value: string) => void;
}
