import { IGridItem } from "./Grid";

export interface IModalProps {
    items: IGridItem[];
    title: string;
    visible: boolean;
    onClose: () => void;
    sendDataToParent: (data: never) => void;
}
