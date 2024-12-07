export enum TitleSize {
    Large = "large",
    Medium = "medium",
}

export interface IInputWithLabel {
    title: string;
    value?: string;
    defaultValue?: string;
    titleSize?: TitleSize;
    inputProps?: object;
    placeholder: string;
    isMultiline: boolean;
}

export interface IInputWithLabelProps extends IInputWithLabel {

    sendDataToParent: (placeholder: string, text: string) => void;
    // TODO this pattern of having sendDataToParent within component props likely exists in several places.
    // Perhaps could have an interface defining the component, and then one for props which extends it

}
