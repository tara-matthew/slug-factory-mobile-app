import React, {useEffect, useMemo, useState} from "react";
import {Dimensions, Image, ScrollView, StyleSheet} from "react-native";
import {IImageListProps, Size} from "../../contracts/Image";

const ImageList = ({ images, size = Size.Large }: IImageListProps) => {
    console.log(images[0]);


    const computedStyles = useMemo(() => {
        return {
            image: size == Size.Large ? styles.largeImage : styles.smallImage
        };
    }, [size]);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={ false }
            pagingEnabled
        >
            {images.map((image, index) => (

                <Image
                    key={ index }
                    source={ { uri: image.startsWith("prints") ? `${process.env.EXPO_PUBLIC_URL}/${image}` : image } }
                    style={ [computedStyles.image, styles.image] }
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        resizeMode: "cover"
    },
    largeImage: {
        width: Dimensions.get("window").width,
        height: 400
    },
    smallImage: {
        width: 200,
        height: 200,
    }
})

export default ImageList;
