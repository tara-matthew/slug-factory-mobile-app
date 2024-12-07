import {IInputWithLabelProps} from "./InputWithLabel";

export interface IInputGroupProps {
    inputs: IInputWithLabelProps[];
    sendDataToParent: (data: never) => void;
}
