import { createContext, useState } from "react";
import { IUserData, AuthContextType, AuthData } from "../interfaces/IAuthProvider";

const AuthContext = createContext<AuthContextType>({});

interface props {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: props) => {
    const [auth, setAuth] = useState<IUserData>({});
    // use localstorage to store a boolean that will tell us if we trust this device or not (check at login page)
    // getItem if it exists or otherwise it's false
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")!) || false);
        
    return (
         <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;