export interface IBooking {
  id?: number;
  accepted?: boolean;
  appointmentDate?: string;
  description?: string;
  nbHours?: number;
  totalPrice?: number;
  idService?: number;
  idClient?: number;
  data?: {
    id?: number;
    accepted?: boolean;
    appointmentDate?: string;
    description?: string;
    nbHours?: number;
    totalPrice?: number;
    idService?: number;
    message?: string;
    idClient?: number;
  };
}

export interface IGetBooking {
  present?: boolean;
  past?: boolean;
  future?: boolean;
  accepted?: boolean;
  props?: {
    present?: boolean;
    past?: boolean;
    future?: boolean;
    accepted?: boolean;
  };
}

export interface IBookings {
  id?: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  services?: [
    {
      id?: number;
      name: string;
      price?: number;
      priceId?: string;
      createdAt?: string;
      updatedAt?: string;
      idCategory?: number;
      idType?: number;
      bookings?: [
        {
          id?: number;
          accepted?: boolean;
          appointmentDate?: string;
          description?: string;
          nbHours?: number;
          totalPrice?: number;
          idService?: number;
          message?: string;
          idClient?: number;
        }
      ];
    }
  ];
}
