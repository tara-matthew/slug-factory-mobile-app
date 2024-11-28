import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    PrintedDesign: { print_id: number; print: object };
    Filament: { filament: object };
    Main: undefined;
    MyProfile: undefined;
    Register: undefined;
    Login: undefined;
};

export type GenericNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type PrintedDesignNavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;
export type FilamentNavigationProps = NativeStackNavigationProp<RootStackParamList, "Filament">;
export type RegisterNavigationProps = NativeStackNavigationProp<RootStackParamList, "Register">;
export type LoginNavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;
