export interface ICardProps {
    item: {
        title: string;
        extraData?: string;
    };
    imageURL: string;
    blurhash: string;
    sendDataToParent: (data: { title: string }) => void;
}
