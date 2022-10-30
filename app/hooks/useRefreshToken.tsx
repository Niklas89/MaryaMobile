import axios from "../api/axios";
import useAuth from "./useAuth";
import authStorage from "../auth/storage";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  // The accesstoken has expired ! With this method we will receive a new one...
  // It works only if the cookie/refreshToken hasn't expired
  const refresh = async () => {
    const response = await axios
      .get("/refresh", {
        withCredentials: true,
      })
      .catch(function (error) {
        // If the cookie/refreshToken has expired redirect to login
        if (error.response.status === 401 || error.response.status === 403) {
          authStorage.removeToken();
          setAuth?.({});
        }
      });
    // Set the new accesstoken received with setAuth()
    setAuth?.({
      ...auth,
      role: response?.data.idRole,
      accessToken: response?.data.accessToken,
    });
    if (response?.data.accessToken !== undefined)
      authStorage.storeToken(response?.data.accessToken);
    console.log(
      "New accesstoken received at refresh : " + response?.data.accessToken
    );
    console.log("Role received : " + response?.data.idRole);

    return response?.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
