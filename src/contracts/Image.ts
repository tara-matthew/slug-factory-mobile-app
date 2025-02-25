export interface IImage {
    id?: string;
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
