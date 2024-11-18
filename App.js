import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
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
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { PrintProvider } from "./src/contexts/PrintsContext";
import { UserProvider, useUser } from "./src/contexts/UserContext";
import CreateProfile from "./src/pages/CreateProfile";
import Register from "./src/pages/Register";
import EditPrint from "./src/pages/EditPrint";

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

// TODO create a nav wrapper
export const LoggedOutLayout = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ {
                headerBackVisible: false,
            } }
            >
                <>
                    <Tab.Screen name="Login" component={ Login } />
                    <Tab.Screen name="Register" component={ Register } />
                </>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export const Layout = () => {
    const { user, loading } = useUser();

    useEffect(() => {
        console.log(loading);
    }, [user]);

    if (loading) {
        return (
            <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user.profile_set_public_at // use set public at
                    ? (
                            <Stack.Screen name="CreateProfile" component={ CreateProfile } />
                        )
                    : (
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
                                <Stack.Screen name="EditPrint" component={ EditPrint } />
                                <Stack.Screen name="Filament" component={ Filament } options={ ({ route }) => ({ title: route.params.filament.title }) } />
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
    const { authState, loading } = useAuth();

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
                        <LoggedOutLayout />
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
