import React, {useState} from "react"
import {Button, StyleSheet, View} from "react-native";
import ImageList from "./ImageList";
import {Size} from "../../contracts/Image";
import {fromRequest} from "../../data-transfer-objects/ImagePickerData";
import * as ImagePicker from "expo-image-picker";

import * as ImageManipulator from "expo-image-manipulator";

const ImageSelector = ({sendDataToParent}) => {
    const [images, setImages] = useState([]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const compressedImagePromises = result.assets.map(asset =>
                ImageManipulator.manipulateAsync(
                    asset.uri,
                    [{ resize: { width: asset.width / 2, height: asset.height / 2 } }],
                    { compress: 0.5 },
                ),
            );

            const compressedImages = await Promise.all(compressedImagePromises);

            const selectedImages = compressedImages.map(asset => ({
                uri: asset.uri,
            }));

            setImages(fromRequest(selectedImages));
            sendDataToParent(fromRequest(selectedImages));
        }
    };
    return (
        <View style={ styles.container } className="mb-8">
            <Button title="Choose images" onPress={ pickImage } />
            {images.length > 0 && <ImageList size={ Size.Small } images={ images } />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30,

    },
});

export default ImageSelector;
