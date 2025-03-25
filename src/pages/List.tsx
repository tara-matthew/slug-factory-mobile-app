import React, {useEffect, useState} from "react";
import {ScrollView, Text, View} from "react-native";
import apiFetch from "../hooks/apiFetch";
import Card from "../components/molecule/Card";
import {ListData} from "../data-transfer-objects/ListData";

const List = ({route}) => {
    const listID = route.params.listID

    const [list, setList] = useState<ListData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        void fetchList();
    }, []);

    const fetchList = async () => {
        try {
            const fetchedList = await apiFetch(`/my/printed-design-lists/${listID}`);
            setList(fetchedList.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDataFromChild = () => {
        // console.log('here');
    }

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    if (list.printed_designs.length === 0) {
        return (<Text>Nothing in this list yet</Text>);
    }

    return (
        <ScrollView>
            <View>
                <Card
                    item={list.printed_designs[0]}
                    imageURL={list.printed_designs[0].images[0].url}
                    blurhash={list.printed_designs[0].images[0].blurhash}
                    sendDataToParent={handleDataFromChild }></Card>
            </View>
        </ScrollView>
    );
};

export default List;
