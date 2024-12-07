export interface ICardProps {
    item: {
        title: string;
    };
    imageURL: string;
    blurhash: string;
    sendDataToParent: (data: { title: string }) => void;
}
