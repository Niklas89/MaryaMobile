import { IService } from "./IService";

export interface ICategory {
  id?: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  services?: IService[];
}
