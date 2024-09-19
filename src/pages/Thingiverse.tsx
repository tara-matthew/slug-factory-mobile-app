import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import RenderHtml from 'react-native-render-html';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";

const Thingiverse = () => {

    const [user, setUser] = useState({})
    const { getUser } = useAuth();

    const source = {
        html: `
<p style='text-align:center;'>
  Hello World!
</p>`
    };

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUser(user);
        };

        void fetchUser();
    }, []);


    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1.3333,
                }}
                source={{
                    uri: 'https://picsum.photos/640/480?random=40225',
                }} />

                <RenderHtml
                    contentWidth={100}
                    source={source}
                />

                <Text>{user.name}</Text>
                <Text>{user.email}</Text>


            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    view: {
        // paddingVertical: 50,
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#DFE4EA'
    }
});

export default Thingiverse;
