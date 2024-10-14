import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import { IImageListProps } from "../../contracts/Image";

const ImageList = ({ images }: IImageListProps) => {
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        if (images.length > 0) {
            const imageUrl = images[0];
            Image.getSize(imageUrl, (width, height) => {
                setAspectRatio(width / height);
            });
        }
    }, [images]);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={ false }
            pagingEnabled
        >
            {images.map((image, index) => (
                <Image
                    key={ index }
                    source={ { uri: image } }
                    style={ { width: Dimensions.get("window").width, aspectRatio: aspectRatio } }
                />
            ))}
        </ScrollView>
    );
};

export default ImageList;
