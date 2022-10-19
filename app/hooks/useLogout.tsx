import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";

type ScreenNavigationProp<T extends keyof RouteParams> = StackNavigationProp<
  RouteParams,
  T
>;

type ScreenRouteProp<T extends keyof RouteParams> = RouteProp<RouteParams, T>;
type Props<T extends keyof RouteParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

// const useLogout: React.FC<Props<"Login">> = ({ navigation }) => {
const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth?.({}); // empty out the current state
    axios("/logout", {
      withCredentials: true,
    })
      .then(() => {
        navigate("/");
      })

      .catch((err) => {
        console.error(err);
      });
  };
  return logout;
  /*
  const logOut = () => {
    setAuth?.({ role: undefined, accessToken: undefined });
  };
  return logOut;  */
};

export default useLogout;
