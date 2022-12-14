import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./app/navigation/RootNavigator";
import AuthContext from "./app/context/AuthProvider";
import TabNavigator from "./app/navigation/TabNavigator";
import { IUserData } from "./app/interfaces/IAuthProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IJwtPayload } from "./app/interfaces/IJwtPayload";
import authStorage from "./app/auth/storage";
import * as SplashScreen from "expo-splash-screen";
import jwtDecode from "jwt-decode";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [auth, setAuth] = useState<IUserData>({});
  const [userDataChange, setUserDataChange] = useState<number>(0);

  const restoreUser = async () => {
    const accessToken = await authStorage.getUser();

    if (accessToken) {
      var decoded = jwtDecode<IJwtPayload>(accessToken);
      const role = decoded.role;
      setAuth?.({ role, accessToken });
    }
  };

  useEffect(() => {
    restoreUser();
    setTimeout(SplashScreen.hideAsync, 2000);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userDataChange, setUserDataChange }}>
      <NavigationContainer>
        {auth.role ? <TabNavigator /> : <RootNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
