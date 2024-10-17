import { IImage } from "./Image";

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
