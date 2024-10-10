import {ReactNode} from "react";

export interface IDividerProps {
    width: DividerWidth;
}

export interface IContentWithDivider {
    top: boolean;
    bottom: boolean;
    outerClass?: string;
    innerClass?: string;
    children: ReactNode;
    dividerWidth: DividerWidth;
}

export enum DividerWidth {
    Half = 'half',
    Full = 'full',
}
