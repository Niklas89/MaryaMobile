import { ReactNode } from "react"
import moment from "moment";

export interface IBooking {
    id?: number,
    accepted?: boolean,
    appointmentDate?: string,
    description?: string,
    nbHours?: number,
    totalPrice?: number,
    idService?: number,
    idClient?: number,
    data?: {
        id?: number,
        accepted?: boolean,
        appointmentDate?: string,
        description?: string,
        nbHours?: number,
        totalPrice?: number,
        idService?: number,
        message?: string,
        idClient?: number,
    },
}

export interface IGetBooking {
    present?: boolean,
    past?: boolean,
    future?: boolean,
    accepted?: boolean
    props?: {
        present?: boolean,
        past?: boolean,
        future?: boolean,
        accepted?: boolean
    }
}

export interface IBookings {
    id?: number,
    appointmentDate?: moment.Moment,

}