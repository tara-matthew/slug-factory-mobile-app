import { IPrint } from "./Print";

export interface IFavourite {
    id: string;
    type: string;
    favourited_at: string;
    resource: IPrint; // TODO union type with other favouritables
}
