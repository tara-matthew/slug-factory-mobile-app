import React from 'react';
import { StyleSheet } from 'react-native';
import "./global.css"
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrintedDesign from "./src/pages/PrintedDesign";
import Thingiverse from "./src/pages/Thingiverse";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <AuthProvider>
            <Layout></Layout>
        </AuthProvider>
    );
};

export const Layout = () => {
    const { authState } = useAuth();

    // if (!authState.authenticated) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { authState?.authenticated ? (
                    <Stack.Screen name="Main" component={ MainTabs } options={{ headerShown: false }} />) : (
                    <Tab.Screen name="Login" component={ Login } /> )}
                <Stack.Screen name="PrintedDesign" component={PrintedDesign} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Thingiverse} />
        </Tab.Navigator>
    );
}

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
