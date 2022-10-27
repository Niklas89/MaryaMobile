import { createContext } from "react";
import { AuthContextType } from "../interfaces/IAuthProvider";

const AuthContext = createContext<AuthContextType>({});

export default AuthContext;
