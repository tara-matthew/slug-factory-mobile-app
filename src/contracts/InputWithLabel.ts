export enum TitleSize {
    Large = "large",
    Medium = "medium",
}

export interface IInputWithLabelProps {
    title: string;
    value: string|null;
    titleSize: TitleSize;
    inputProps: object;
    placeholder: string;
    isMultiline: boolean;
    sendDataToParent: (placeholder: string, text: string) => void;

}
