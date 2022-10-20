import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";

const ProfileCategoryScreen = () => {
  const { auth, setAuth } = useAuth();
  return (
    <View>
      <Text>Changer de catégorie</Text>
    </View>
  );
};

export default ProfileCategoryScreen;

const styles = StyleSheet.create({});
