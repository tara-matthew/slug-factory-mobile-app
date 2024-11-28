import { ILoginErrorResponse, ILoginSuccessResponse } from "./Login";
import { ReactNode } from "react";

type LoginResponse = ILoginSuccessResponse | ILoginErrorResponse;

export interface IAuthContext {
    logout: () => void;
    onLogin: (username: string, password: string) => Promise<LoginResponse>;
    onRegister: (name: string, email: string, username: string, password: string, password_confirmation: string) => Promise<{ error: boolean }>;
}

export interface IAuthProviderProps {
    children: ReactNode;
}
