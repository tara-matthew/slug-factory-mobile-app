import { IPrint } from "./Print";
import {IImage} from "./Image";

export interface IGridProps {
    items: IGridItem[];
}

export interface IGridItem {
    title: string;
    images: IImage[];
}
