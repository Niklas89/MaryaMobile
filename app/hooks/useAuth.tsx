import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

// global auth state to use throughout the application globally
const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.role ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};

export default useAuth;
