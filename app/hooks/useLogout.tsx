import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setAuth?.({}); // empty out the current state
        axios('/logout', {
                withCredentials: true
            })
            .then(() => {
                navigate("/");
            })
            
        .catch(err => {
            console.error(err);
        })
    }
    return logout;
}

export default useLogout