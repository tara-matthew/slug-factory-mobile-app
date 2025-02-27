import React, {useEffect, useState} from 'react'
import {Text, View } from "react-native";
import apiFetch from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";

const MyLists = () => {
    const [loading, setLoading] = useState(true)
    const [lists, setLists] = useState([])

    useEffect(() => {
        void getLists()
    }, []);

    const handleDataFromChild = () => {
        return;
    }

    const getLists = async () => {
        try {
            const lists = await apiFetch("/my/printed-design-lists");
            setLists(lists.data)
        } catch (error) {
            console.error("Error in getLists", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    return (
        <View>
            <Grid items={ lists } sendDataToParent={ handleDataFromChild } ></Grid>

        </View>
    )
}

export default MyLists;
