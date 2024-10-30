import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {
    PrintedDesign: { print: object };
    Filament: { filament: object };
};

export type PrintedDesignNavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;
export type ProfileNavigationProps = NativeStackNavigationProp<RootStackParamList, "Filament">;
