export interface ILoginSuccessResponse {
    data: {
        token: string;
    };
}

export interface ILoginErrorResponse {
    message: string;
}
