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
    type: "PrintedDesign",
    user_id: "",
    user: {
        id: "",
        name: "",
        username: "",
        email: "",
        avatar_url: "",
        favourites_count: 0,
        prints_count: 0,
    },
    title: "",
    description: "",
    images: [
        {
            id: "",
            printed_design_id: "",
            url: "",
            blurhash: "",
            is_cover_image: false,
        },
    ],
    filament_brand: {
        id: "",
        name: "",
        created_at: "",
        updated_at: "",
    },
    filament_colour: {
        id: "",
        name: "",
        created_at: "",
        updated_at: "",
    },
    filament_material: {
        id: "",
        name: "",
        created_at: "",
        updated_at: "",
    },
    is_favourite: false,
    favourited_count: 0,
    settings: {
        id: "",
        infill_percentage: 0,
        print_speed: 0,
        nozzle_size: 0,
        uses_supports: false,
        adhesion_type: "" },
    created_at: "",
};
