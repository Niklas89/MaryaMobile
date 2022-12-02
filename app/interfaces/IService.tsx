import { ReactNode } from "react";
import { IBooking } from "./IBooking";
export interface IService {
  id?: number;
  name: string;
  price?: number;
  priceId?: string;
  createdAt?: string;
  updatedAt?: string;
  idCategory?: number;
  idType?: number;
  bookings?: IBooking[];
}

export interface IProps {
  id: ReactNode;
}
