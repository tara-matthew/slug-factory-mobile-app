import { IGridItem } from "./Grid";

export interface IModalProps {
    items: IGridItem[];
    title: string;
    visible: boolean;
    isButtonDisabled: boolean;
    onClose: () => void;
    sendDataToParent: (data: never) => void;
    saveInParent: (data: IGridItem[]) => void;
}
