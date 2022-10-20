import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";

const ProfilePersoInfoScreen = () => {
  const { auth, setAuth } = useAuth();
  return (
    <View>
      <Text>Informations personnelles</Text>
    </View>
  );
};

export default ProfilePersoInfoScreen;

const styles = StyleSheet.create({});
