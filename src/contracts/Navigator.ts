import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    PrintedDesign: { print_id: string, title: string };
    Filament: { filament: object };
    EditPrint: { id: string }
    Main: undefined;
    MyProfile: undefined;
    Register: undefined;
    Login: undefined;
};

export type GenericNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type PrintedDesignNavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;
export type EditPrintedDesignNavigationProps = NativeStackNavigationProp<RootStackParamList, "EditPrint">;
export type FilamentNavigationProps = NativeStackNavigationProp<RootStackParamList, "Filament">;
export type RegisterNavigationProps = NativeStackNavigationProp<RootStackParamList, "Register">;
export type LoginNavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;
