import { IUser } from "./IUser";

export type AuthContextType = {
    auth?: IUser;
    persist?: boolean;
    setAuth?: (auth: IUser) => void;
    setPersist?: (persist: boolean) => void;
    //updateTodo: (id: number) => void;
  }; 