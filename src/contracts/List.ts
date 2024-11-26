import { IImage } from "./Image";

export interface IListProps {
    data: IListData[];
    sendDataToParent: (data: never) => void;
}

export interface IListData {
    images?: IImage[];
    image_url?: string;
}
