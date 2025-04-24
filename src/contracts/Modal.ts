import { IGridItem } from "./Grid";

export interface IModalProps {
    items: IGridItem[];
    visible: boolean;
    onClose: () => void;
    sendDataToParent: (data: never) => void;
}
