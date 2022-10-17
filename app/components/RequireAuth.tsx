import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// RequireAuth component can protect any child component that are nested inside of it
const RequireAuth = ({ allowedRoles }: any) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    return ( 
        // check if allowedRoles array includes the role that is beeing passed, to let user view page
        allowedRoles?.find((role: any) => role === auth?.role)
            ? <Outlet /> // Outlet component represents any child component of RequireAuth component
            : auth?.role // else if role not authorized but is not null: redirect to unauthorized page 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace /> // else if role is null redirect to login page.
    );
}

export default RequireAuth;