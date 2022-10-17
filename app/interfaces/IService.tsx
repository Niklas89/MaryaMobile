import { ReactNode } from "react";


export interface IService {
    id?: number,
    name: string,
    price?: number,
    priceId?: string,
    createdAt?: string,
    updatedAt?: string,
    idCategory?: number,
    idType?: number,
}

export interface IProps {
    id: ReactNode;
}