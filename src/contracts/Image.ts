export interface IImage {
    id: number;
    url: string;
}

export interface IImageListProps {
    images: string[];
    blurhashes: string[];
    size: Size;
}

export enum Size {
    Small = "small",
    Large = "large",
}
