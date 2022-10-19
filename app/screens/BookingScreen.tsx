import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";


const BookingScreen = () => {
  const { auth, setAuth } = useAuth();
  return (
    <View>
      <Text>
        BookingScreen {auth?.role} {auth?.accessToken}
      </Text>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
