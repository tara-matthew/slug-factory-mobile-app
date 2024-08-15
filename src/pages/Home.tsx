import React, {memo, useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import ListGroup from "../components/template/ListGroup";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const {
        data: latestPrints,
        loading: loadingLatest,
        error: errorLatest,
    } = useFetch('prints/latest');

    const {
        data: popularPrints,
        loading: loadingPopular,
        error: errorPopular
    } = useFetch('my/prints'); // todo route alias

    const {
        data: randomPrints,
        loading: loadingRandom,
        error: errorRandom
    } = useFetch('prints/random');

    if (loadingLatest || loadingPopular || loadingRandom) {
        return <Text>Loading...</Text>;
    }

    return (
        <View className={"relative"}>
            <ScrollView contentContainerStyle={styles.container}>
               <ListGroup data={{heading: "Recently Added", data: latestPrints}}></ListGroup>
               <ListGroup data={{heading: "Most Popular", data: popularPrints}}></ListGroup>
               <ListGroup data={{heading: "Last Viewed", data: latestPrints}}></ListGroup>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default memo(Home);
