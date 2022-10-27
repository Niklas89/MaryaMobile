import axios from "../api/axios";
import useAuth from "./useAuth";
import authStorage from "../auth/storage";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth?.({
      ...auth,
      role: response.data.idRole,
      accessToken: response.data.accessToken,
    });
    const accessToken = await authStorage.getUser();
    if (accessToken === null) authStorage.storeToken(response.data.accessToken);

    console.log("useRefreshToken method called.");
    console.log("refreshtoken received : " + response.data.accessToken);
    console.log("role received : " + response.data.idRole);

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
