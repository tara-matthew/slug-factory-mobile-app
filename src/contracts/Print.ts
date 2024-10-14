import {IImage} from "./Image";

export interface IPrint {
    created_at: string;
    description: string;
    filament_brand: object;
    filament_colour: object;
    filament_material: object;
    id: string;
    images: IImage[];
    infill_percentage?: number;
    title: string;
    type: string;
    user_id: string;
}
