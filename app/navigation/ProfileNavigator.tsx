import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileAddressScreen from "../screens/ProfileAddressScreen";
import ProfileCategoryScreen from "../screens/ProfileCategoryScreen";
import ProfilePersoInfoScreen from "../screens/ProfilePersoInfoScreen";
import ProfileBankDetailsScreen from "../screens/ProfileBankDetailsScreen";
import ProfilePasswordScreen from "../screens/ProfilePasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { RouteParams } from "./RootNavigator";
import colors from "../config/colors";

const Stack = createStackNavigator<RouteParams>();

const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitleAlign: "left",
    }}
  >
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Address"
      component={ProfileAddressScreen}
      options={{ title: "Adresse" }}
    />
    <Stack.Screen
      name="Category"
      component={ProfileCategoryScreen}
      options={{ title: "Catégorie" }}
    />
    <Stack.Screen
      name="PersoInfos"
      component={ProfilePersoInfoScreen}
      options={{ title: "Informations personnelles" }}
    />
    <Stack.Screen
      name="Password"
      component={ProfilePasswordScreen}
      options={{ title: "Mot de passe" }}
    />
    <Stack.Screen
      name="BankDetails"
      component={ProfileBankDetailsScreen}
      options={{ title: "Informations bancaires" }}
    />
  </Stack.Navigator>
);

export default ProfileNavigator;
