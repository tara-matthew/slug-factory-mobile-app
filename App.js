import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent, Image, ScrollView} from 'react-native';
import List from "./src/components/organism/List";
import useFetch from "./src/hooks/useFetch";
import { Ionicons } from '@expo/vector-icons';
import "./global.css"
import ListGroup from "./src/components/template/ListGroup";
import Home from "./src/pages/Home";
import Form from "./src/components/organism/Form";

const App = () => {
        return (
            // <Home></Home>
            <Form headerText={"Sign in to Slug Factory"} buttonText={"Sign In"} inputs={[{placeholder: "Email"}, {placeholder: "Password"}]}></Form>
        );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 100,
        paddingHorizontal: 20
    },
    outerContainer: {
      position: 'relative'
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default App;
