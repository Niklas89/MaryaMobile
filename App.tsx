import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthProvider";

export default function App() {
  return (
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
  );
}


