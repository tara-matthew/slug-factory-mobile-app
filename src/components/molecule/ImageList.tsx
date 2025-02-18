import React, { useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { IImageListProps, Size } from "../../contracts/Image";
import { Image } from "expo-image";

const ImageList = ({ images, size = Size.Large }: IImageListProps) => {
    const blurhash
        = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

    const computedStyles = useMemo(() => {
        return {
            image: size == Size.Large ? styles.largeImage : styles.smallImage,
        };
    }, [size]);

    /*

        const computedStyles = {
        [Size.Large]: styles.largeImage,
        [Size.Small]: styles.smallImage,
    };
     */

    const imageSource = (url: string) => {
        return url.startsWith("prints") ? `${process.env.EXPO_PUBLIC_URL}/${url}` : url;
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={ false }
            pagingEnabled
        >
            {images.map((image, index) => (

                <Image
                    key={ index }
                    placeholder={ image?.blurhash ?? blurhash }
                    transition={ 500 }
                    source={ imageSource(image.url) }
                    style={ [computedStyles.image, styles.image] }
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        objectFit: "cover",
    },
    largeImage: {
        width: Dimensions.get("window").width,
        height: 400,
    },
    smallImage: {
        width: 200,
        height: 200,
    },
});

export default ImageList;
