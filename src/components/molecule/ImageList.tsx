import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import { IImageListProps } from "../../contracts/Image";

const ImageList = ({ images }: IImageListProps) => {
    console.log({images});
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        if (images.length > 0) {
            const imageUrl = images[0].startsWith("https") ? images[0] : `https://5lowb7p0bv.sharedwithexpose.com/${images[0]}`;
            Image.getSize(imageUrl, (width, height) => {
                setAspectRatio(width / height);
            });
            console.log(aspectRatio)
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
                    source={ { uri: image.startsWith("https") ? image : `https://5lowb7p0bv.sharedwithexpose.com/${image}` } }
                    style={ { width: Dimensions.get("window").width, height: 400, resizeMode: "cover" } }
                />
            ))}
        </ScrollView>
    );
};

export default ImageList;
