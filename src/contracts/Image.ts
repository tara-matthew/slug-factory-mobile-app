export interface IImage {
    id?: number;
    url: string;
    blurhash?: string;
}

export interface IImageListProps {
    images: IImage[];
    size: Size;
}

export enum Size {
    Small = "small",
    Large = "large",
}
