import React, { useEffect, useState } from "react";
import { View } from "react-native";
import fetchData from "../hooks/apiFetch";
import Grid from "../components/organism/Grid";

const MyPrints = () => {
    const [loading, setLoading] = useState(true);
    const [prints, setPrints] = useState({});

    useEffect(() => {
        void getPrints();
    }, []);

    const getPrints = async () => {
        try {
            const prints = await fetchData("/prints/latest");
            setPrints(prints.data);
        } catch (error) {
            console.error("Error in getting prints", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            {/* <ScrollView> */}
            <Grid prints={ prints }></Grid>
            {/* </ScrollView> */}
        </View>
    );
};

export default MyPrints;
