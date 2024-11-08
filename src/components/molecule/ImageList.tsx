import React, {useEffect, useMemo, useState} from "react";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {IImageListProps, Size} from "../../contracts/Image";
import { Image } from 'expo-image';


const ImageList = ({ images, blurhashes, size = Size.Large }: IImageListProps) => {
    console.log(images[0]);
    // const blurhash =
    //     '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


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
                    placeholder={blurhashes?.[index] ?? '1234'}
                    transition={5000}
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
