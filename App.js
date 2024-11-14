import React, { useEffect } from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import "./global.css";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PrintedDesign from "./src/pages/PrintedDesign";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import MyProfile from "./src/pages/MyProfile";
import EditProfile from "./src/pages/EditProfile";
import MyPrints from "./src/pages/MyPrints";
import MyFavouritePrints from "./src/pages/MyFavouritePrints";
import MyFavouriteFilaments from "./src/pages/MyFavouriteFilaments";
import Filament from "./src/pages/Filament";
import ImagePickerExample from "./src/pages/ImagePicker";
import StorePrint from "./src/pages/StorePrint";
import {ActivityIndicator, PaperProvider} from "react-native-paper";
import { PrintProvider } from "./src/contexts/PrintsContext";
import { UserProvider } from "./src/contexts/UserContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const App = () => {
    return (
        <AuthProvider>
            <AppContent></AppContent>
        </AuthProvider>
    );
};

export const Layout = () => {
    const { authState } = useAuth();

    useEffect(() => {
        console.log(authState);
    });

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
                                <Stack.Screen
                                    name="MyPrints"
                                    component={ MyPrints }
                                    options={ { title: "My Prints", headerBackTitle: "Back" } }
                                />
                                <Stack.Screen
                                    name="MyFavouritePrints"
                                    component={ MyFavouritePrints }
                                    options={ { title: "My Favourite Prints", headerBackTitle: "Back" } }
                                />
                                <Stack.Screen name="PrintedDesign" component={ PrintedDesign } options={ ({ route }) => ({ title: route.params.print.title }) } />
                                <Stack.Screen name="Filament" component={ Filament } options={ ({ route }) => ({ title: route.params.filament.title }) } />
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
            <Tab.Screen name="Favourites" component={ FavouriteTopTabs } options={ { title: "Favourites" } } />
            <Tab.Screen name="Image" component={ ImagePickerExample } />
            <Tab.Screen name="New Print" component={ StorePrint } />
            <Tab.Screen name="ProfileStack" component={ ProfileStack } options={ { headerShown: false, title: "Profile" } } />
        </Tab.Navigator>
    );
}

const AppContent = () => {
    const { authState } = useAuth();

    return (
        <PaperProvider>
            {authState.authenticated
                ? (
                        <UserProvider>
                            <PrintProvider>
                                <Layout />
                            </PrintProvider>
                        </UserProvider>
                    )
                : (
                        <Layout />
                    )}
        </PaperProvider>
    );
};

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

function FavouriteTopTabs() {
    return (
        <TopTab.Navigator
            initialLayout={ { width: Dimensions.get("window").width } }
            screenOptions={ {
                tabBarLabelStyle: { textTransform: "none", fontSize: 16 },
                tabBarIndicatorStyle: { backgroundColor: "#d0cadb" },
                tabBarItemStyle:
                { width: Dimensions.get("window").width / 2 },
            } }
        >
            <TopTab.Screen name="Prints" component={ MyFavouritePrints } />
            <TopTab.Screen name="Filaments" component={ MyFavouriteFilaments } />
        </TopTab.Navigator>
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
