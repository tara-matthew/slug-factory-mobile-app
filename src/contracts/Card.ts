export interface ICardProps {
    item: {
        title: string;
    };
    imageURL: string;
    blurhash: string;
    sendDataToParent: (data: never) => void;
}
