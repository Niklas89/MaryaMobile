import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";

const ProfileBankDetailsScreen = () => {
  const { auth, setAuth } = useAuth();
  return (
    <View>
      <Text>Bank Details</Text>
    </View>
  );
};

export default ProfileBankDetailsScreen;

const styles = StyleSheet.create({});
