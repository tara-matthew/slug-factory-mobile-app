import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, FlatListComponent, Image, ScrollView} from 'react-native';
import List from "./src/components/organism/List";
import useFetch from "./src/hooks/useFetch";
import { Ionicons } from '@expo/vector-icons';
import "./global.css"
import ListGroup from "./src/components/template/ListGroup";
import Home from "./src/pages/Home";
import Form from "./src/components/organism/Form";
import Welcome from "./src/components/template/Welcome";
import Login from "./src/pages/Login";
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PrintedDesign from "./src/pages/PrintedDesign";
import Thingiverse from "./src/pages/Thingiverse";
import {AuthProvider} from "./src/contexts/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
        return (
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Tab.Screen name="Login" component={Login} />
                        <Tab.Screen name="Home" component={Home} />
                        <Tab.Screen name="PrintedDesign" component={PrintedDesign} />
                        <Tab.Screen name="Thingiverse" component={Thingiverse} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
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
