import { IImage } from "./Image";
import { PrintData } from "../data-transfer-objects/PrintData";

export interface IPrint {
    id: string;
    type: string;
    user_id: string;
    title: string;
    description: string;
    filament_brand: object; // TODO proper interface
    filament_colour: object;
    filament_material: object;
    images: IImage[];
    infill_percentage?: number;
    created_at: string;
    is_favourite: boolean;
}

export const defaultPrint: PrintData = {
    id: "",
    title: "",
    description: "",
    user_id: "",
    filament_material: { id: "", name: "" },
    filament_colour: { id: "", name: "" },
    favourited_count: 0,
    is_favourite: false,
    settings: { uses_supports: false, adhesion_type: "" },
    created_at: "",
    images: [
        {
            id: "",
            printed_design_id: "",
            url: "",
            blurhash: "",
            is_cover_image: false,
        },
    ],
    user: {
        id: "",
        prints_count: 0,
        username: "",
        avatar_url: "",
    },
};
