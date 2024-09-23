import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView } from "react-native";

const ImageList = (props) => {
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        if (props.images.length > 0) {
            const imageUrl = props.images[0];
            Image.getSize(imageUrl, (width, height) => {
                setAspectRatio(width / height);
            });
        }
    }, [props.images]);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={ false }
            pagingEnabled
        >
            {props.images.map((image, index) => (
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
