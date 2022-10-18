import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, StyleSheet, Text, View } from "react-native";
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

const ProfileScreen: React.FC<Props<"Profile">> = ({ navigation }) => {
  const { auth, setAuth } = useAuth();
  return (
    <View>
      <Text>
        ProfileScreen {auth?.role} {auth?.accessToken}
      </Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
        color="blue"
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
