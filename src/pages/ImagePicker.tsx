import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import apiFetch from "../hooks/apiFetch";
import fetchData from "../hooks/apiFetch";

const  ImagePickerExample = () => {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.assets);

        let formData = new FormData();
        formData.append('file', {
            uri: result.assets[0].uri,
            name: `name`,
            // type: `image/jpeg`,
        });

        console.log('here', formData);

        // console.log(result.assets[0].uri);

        let options = {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        try {
            await fetch('https://5qfgpmiix4.sharedwithexpose.com/api/upload', options)//apiFetch('/upload', 'POST', {body: formData});
        } catch (error) {
            console.log(error);
        }

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default ImagePickerExample;
