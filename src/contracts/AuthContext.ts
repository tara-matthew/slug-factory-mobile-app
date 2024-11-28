export interface IAuthContext {
    logout: () => void;
    onLogin: (username: string, password: string) => Promise<never>;
    onRegister: (name: string, email: string, username: string, password: string, password_confirmation: string) => Promise<{ error: boolean}>;
}
