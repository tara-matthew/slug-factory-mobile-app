import { ILoginErrorResponse, ILoginSuccessResponse } from "./Login";
import { ReactNode } from "react";

export interface IAuthContext {
    logout: () => void;
    onLogin: (username: string, password: string) => Promise<ILoginErrorResponse | ILoginSuccessResponse>;
    onRegister: (name: string, email: string, username: string, password: string, password_confirmation: string) => Promise<{ error: boolean }>;
}

export interface IAuthProviderProps {
    children: ReactNode;
}
