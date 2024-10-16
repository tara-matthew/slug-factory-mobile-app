import React, { useEffect, useState } from "react";
import {Text, View} from "react-native";
import fetchData from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";

const MyPrints = () => {
    const [loading, setLoading] = useState(true);
    const [prints, setPrints] = useState([]);

    useEffect(() => {
        void getPrints();
    }, []);

    const getPrints = async () => {
        try {
            const prints = await fetchData("/my/prints");
            setPrints(prints.data);
        } catch (error) {
            console.error("Error in getting prints", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    return (
        <View>
            <Grid prints={ prints }></Grid>
        </View>
    );
};

export default MyPrints;
