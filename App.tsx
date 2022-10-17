import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './app/navigation/RootNavigator';
import LoginScreen from "./app/screens/LoginScreen";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    //  <LoginScreen />
  );
}


