import { PrintData } from "./PrintData";

export interface ListData {
    id: string;
    title: string;
    image_url: string;
    printed_designs?: PrintData[]; // TODO create reduced interface
    count?: number;
    contains_item?: boolean; // Maybe make this more generic as a name
}
