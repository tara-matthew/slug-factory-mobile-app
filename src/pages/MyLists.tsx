import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View} from "react-native";
import apiFetch from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import { useNavigation } from "@react-navigation/native";
import List from "./List";

const MyLists = () => {
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([{
        // title: "Recently Viewed",
        // image_url: "https://fastly.picsum.photos/id/488/640/480.jpg?hmac=sWWw446VOr-h4w5IzFlmXdwIicctjWtsNDGi9bX-HR4",
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
            const response = await apiFetch("/my/printed-design-lists");
            const lists = response.data.map(list => ({
                ...list,
                extraData: `${list.count} in list`,
            }));
            setLists(lists);
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
        <View style={styles.grid}>
            <Grid items={ lists } sendDataToParent={ handleDataFromChild }></Grid>
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        padding: 20,
    },
    card: {
        marginRight: 20,
    },
});

export default MyLists;
