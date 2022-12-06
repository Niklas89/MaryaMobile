import { Dispatch, SetStateAction } from "react";
import { IUser } from "./IUser";

export type AuthData = {
    id?: number
    email?: string
    role?: number
    accessToken?: string
}
/*
export interface IPersist {
    persist?: boolean
    setPersist?: Dispatch<SetStateAction<boolean>> | Dispatch<any>
} */

export interface IUserData {
    id?: number
    email?: string
    role?: number
    accessToken?: string
    auth?: AuthData,
    setAuth?: Dispatch<SetStateAction<AuthData>>
    setPersist?: Dispatch<SetStateAction<boolean>> | Dispatch<any>
}

export type AuthContextType = {
    auth?: {
        id?: number
        email?: string
        role?: number
        accessToken?: string    
    };
    persist?: boolean | undefined;
    setAuth?: (auth: AuthData) => void;
    setPersist?: (persist: boolean) => void;
    userDataChange: number;
    setUserDataChange: (value: number) => void;
};

export interface StringArray {
    length: number;
    [index: number]: string;
}