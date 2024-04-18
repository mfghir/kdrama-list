export interface InputError {
    [key: string]: string;
}

export interface ResetPasswordProps {
    params: {
        token: string
    }
}