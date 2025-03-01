export interface PrintData {
    id: string;
    type: string;
    user_id: string;
    user: {
        id: string;
        name: string;
        username: string;
        email: string;
        avatar_url: string;
        favourites_count: number;
        prints_count: number;
    };
    title: string;
    description: string;
    images: [
        {
            id: string;
            printed_design_id: string;
            user_id?: string;
            url: string;
            blurhash: string;
            is_cover_image: boolean;
        },
    ];
    filament_brand: {
        id: string;
        name: string;
        created_at: string;
        updated_at: string;
    };
    filament_colour: {
        id: string;
        name: string;
        created_at: string;
        updated_at: string;
    };
    filament_material: {
        id: string;
        name: string;
        created_at: string;
        updated_at: string;
    };
    is_favourite: boolean;
    favourited_count: number;
    settings: {
        id: string;
        infill_percentage: number;
        print_speed: number;
        nozzle_size: number;
        uses_supports: boolean;
        adhesion_type: string;
    };
    created_at: string;
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
