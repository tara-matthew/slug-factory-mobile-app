import { IImage } from "../contracts/Image";

export interface ImagePickerData {
    uri: string;
}

export function fromRequest(images: ImagePickerData[]): IImage[] {
    return images.map(image => fromImagePickerData(image));
}

export function fromImagePickerData(data: ImagePickerData): IImage {
    return {
        url: data.uri,
    };
}
