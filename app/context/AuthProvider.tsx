import { createContext, ReactElement, useState } from "react";
import { IUserData, AuthContextType, AuthData } from "../interfaces/IAuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<AuthContextType>({});

interface props {
    children: JSX.Element | React.ReactElement | JSX.Element[]
}

export const AuthProvider = ({ children }: props) => {
    const [auth, setAuth] = useState<IUserData>({});
    // use localstorage to store a boolean that will tell us if we trust this device or not (check at login page)
    // getItem if it exists or otherwise it's false
    /* const jsonValue = await AsyncStorage.getItem('persist')
    const [persist, setPersist] = useState((jsonValue != null ? JSON.parse(jsonValue) : null) || false); */
    const [persist, setPersist] = useState(true);
        
    return (
         <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;