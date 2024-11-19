import React, {memo, useEffect} from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import ListGroup from "../components/template/ListGroup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../contracts/Navigator";
import { usePrints } from "../contexts/PrintsContext";
import { useAuth } from "../contexts/AuthContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;

const Home = () => {
    const { prints, loading, fetchPrints } = usePrints();
    const { logout } = useAuth();
    const navigation = useNavigation<NavigationProps>();

    async function handleDataFromChild(item) {
        navigation.navigate("PrintedDesign", { print_id: item.id, print: item });
    }

    useEffect(() => {
        fetchPrints();
        console.log("prints", prints);
    }, []);

    if (loading) {
        return (<Text>Loading...</Text>);
    }

    return (
        <View className="relative">
            <ScrollView contentContainerStyle={ styles.container }>
                <ListGroup sendDataToParent={ handleDataFromChild } heading="Recently Uploaded" data={ prints.latest }></ListGroup>
                <ListGroup sendDataToParent={ handleDataFromChild } heading="Most Popular" data={ prints.popular }></ListGroup>
                <ListGroup sendDataToParent={ handleDataFromChild } heading="Last Viewed" data={ prints.random }></ListGroup>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default memo(Home);
