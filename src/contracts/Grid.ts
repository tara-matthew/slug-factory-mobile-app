import { IImage } from "./Image";

export interface IGridProps {
    items: IGridItem[];
    sendDataToParent: (data: never) => void;
}

export interface IGridItem {
    title: string;
    images?: IImage[];
    image_url?: string;
}
