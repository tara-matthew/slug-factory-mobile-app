import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import apiFetch from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";
import { useNavigation } from "@react-navigation/native";

const MyLists = () => {
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([{}]);
    const navigation = useNavigation();

    useEffect(() => {
        void getLists();
    }, []);

    const handleDataFromChild = (item) => {
        console.log(item.id);
        // @ts-ignore
        if (item.id) {
            navigation.navigate("List", { listID: item.id });
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
        <View className="p-6">
            <Grid items={ lists } sendDataToParent={ handleDataFromChild }></Grid>
        </View>
    );
};

export default MyLists;
