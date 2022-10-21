export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  isActive?: number;
  deactivatedDate?: string;
  createdAt?: string;
  updatedAt?: string;
  idRole?: number;
  resetToken?: string;
  resetTokenExpiration?: string;
  refreshToken?: string;
  role?: number;
  persist?: boolean;
  accessToken?: string;
  address?: string;
  city?: string;
  phone?: string;
  postalCode?: string;
  birthdate?: string;
  IBAN?: string;
  SIRET?: string;
}
