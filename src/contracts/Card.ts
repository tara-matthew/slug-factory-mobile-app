export interface ICardProps {
    item: {
        title: string;
        extraData?: string;
        contains_item?: boolean; // Maybe make this more generic as a name
    };
    imageURL: string;
    blurhash: string;
    sendDataToParent: (data: { title: string }) => void;
}
