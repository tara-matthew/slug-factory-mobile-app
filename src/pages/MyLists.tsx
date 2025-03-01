import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import apiFetch from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import { useNavigation } from "@react-navigation/native";
import List from "./List";

const MyLists = () => {
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([{
        title: "Add New List",
        image_url: "https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg",
    }]);
    const navigation = useNavigation();

    useEffect(() => {
        void getLists();
    }, []);

    const handleDataFromChild = (item) => {
        console.log(item.id);
        // @ts-ignore
        if (item.id) {
            navigation.navigate("List", {listID: item.id});
        }
    };

    const getLists = async () => {
        try {
            const lists = await apiFetch("/my/printed-design-lists");
            setLists(prevLists => [
                prevLists[0],
                ...lists.data,
            ]);
        } catch (error) {
            console.error("Error in getLists", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    return (
        <View>
            <Grid items={ lists } sendDataToParent={ handleDataFromChild }></Grid>
        </View>
    );
};

export default MyLists;
