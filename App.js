import React from "react";
import { StyleSheet } from "react-native";
import "./global.css";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrintedDesign from "./src/pages/PrintedDesign";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import MyProfile from "./src/pages/MyProfile";
import EditProfile from "./src/pages/EditProfile";

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
                { authState?.authenticated
                    ? (
                            <>
                                <Stack.Screen name="Main" component={ MainTabs } options={ { headerShown: false, title: "Home" } } />
                                <Stack.Screen
                                    name="EditProfile"
                                    component={ EditProfile }
                                    options={ { title: "Edit Profile", headerBackTitle: "Back" } }
                                />
                                <Stack.Screen name="PrintedDesign" component={ PrintedDesign } options={ ({ route }) => ({ title: route.params.print.title }) } />
                            </>
                        )

                    : (
                            <>
                                <Tab.Screen name="Login" component={ Login } />
                            </>
                        )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ Home } />
            <Tab.Screen name="ProfileStack" component={ ProfileStack } options={ { headerShown: false, title: "Profile" } } />
        </Tab.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyProfile"
                component={ MyProfile }
                options={ { title: "Profile" } }
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 100,
        paddingHorizontal: 20,
    },
    outerContainer: {
        position: "relative",
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default App;
