import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    PrintedDesign: { print_id: string; title: string };
    List: { listID: string };
    Filament: { filament: object };
    EditPrint: { id: string };
    Main: undefined;
    MyProfile: undefined;
    Register: undefined;
    Login: undefined;
};

export type GenericNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type PrintedDesignNavigationProps = NativeStackNavigationProp<RootStackParamList, "PrintedDesign">;
export type ListNavigationProps = NativeStackNavigationProp<RootStackParamList, "List">;
export type EditPrintedDesignNavigationProps = NativeStackNavigationProp<RootStackParamList, "EditPrint">;
export type FilamentNavigationProps = NativeStackNavigationProp<RootStackParamList, "Filament">;
export type RegisterNavigationProps = NativeStackNavigationProp<RootStackParamList, "Register">;
export type LoginNavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;
export type PrintedDesignRouteProp = RouteProp<RootStackParamList, "PrintedDesign">;
export type ListRouteProp = RouteProp<RootStackParamList, "List">;

export type PrintedDesignProps = {
    route: PrintedDesignRouteProp;
};

export type ListProps = {
    route: ListRouteProp;
};
