import {ILoginErrorResponse, ILoginSuccessResponse} from "./Login";

export interface IAuthContext {
    logout: () => void;
    onLogin: (username: string, password: string) => Promise<ILoginErrorResponse | ILoginSuccessResponse>;
    onRegister: (name: string, email: string, username: string, password: string, password_confirmation: string) => Promise<{ error: boolean}>;
}
