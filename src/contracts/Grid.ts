import { IImage } from "./Image";

export interface IGridProps {
    items: IGridItem[];
    sendDataToParent: (data: never) => void;
}

export interface IGridItem {
    images?: IImage[];
    image_url?: string;
}
