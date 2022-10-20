import React, { useContext } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
import BackgroundImg from "../components/BackgroundImg";

type ScreenNavigationProp<T extends keyof RouteParams> = StackNavigationProp<
  RouteParams,
  T
>;

type ScreenRouteProp<T extends keyof RouteParams> = RouteProp<RouteParams, T>;
type Props<T extends keyof RouteParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const HomeScreen: React.FC<Props<"Home">> = ({ navigation }) => {
  return (
    <>
      <BackgroundImg />
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={require("../assets/img/logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="Connexion"
              onPress={() => navigation.navigate("Login")}
              color="#008F8C"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Inscription"
              onPress={() => navigation.navigate("Register")}
              color="#0FC2C0"
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },
  logo: {
    position: "relative",
    width: 200,
    height: 200,
  },
  buttons: {
    justifyContent: "flex-end",
    margin: 10,
  },
  button: {
    padding: 10,
  },
});

export default HomeScreen;
