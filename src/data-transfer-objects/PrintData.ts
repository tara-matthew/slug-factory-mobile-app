import {IPrint} from "../contracts/Print";

export interface PrintData {
    id: string;
    title: string;
    description: string;
    filament_material: {
        id: string;
        name: string;
    };
    filament_colour: {
        id: string;
        name: string;
    };
    settings: {
        uses_supports: boolean;
        adhesion_type: string;
    };
    images: [
        {
            id: string;
            printed_design_id: string;
            url: string;
            blurhash: string;
            is_cover_image: boolean;
        },
    ];
}

export function fromResponse(print: PrintData) {
    return {
        id: print.id,
        title: print.title,
        description: print.description,
        filament_material_id: print.filament_material.id,
        // filament_colour_id: print.filament_colour.id,
        uses_supports: print?.settings?.uses_supports,
        adhesion_type: print?.settings?.adhesion_type,
        images: print.images,
    };
}
