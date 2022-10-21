import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./app/navigation/RootNavigator";
import { AuthProvider } from "./app/context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
