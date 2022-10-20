import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { IUser } from "../interfaces/IUser";
import { AxiosFunction } from "../api/AxiosFunction";
import { AxiosError, AxiosResponse } from "axios";
import useAuth from "../hooks/useAuth";
import BackgroundImg from "../components/BackgroundImg";
import colors from "../config/colors";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
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

const LOGIN_URL = "auth/login";

const LoginScreen: React.FC<Props<"Login">> = ({ navigation }) => {
  //const [userInfo, setUserInfos] = useState<IUser>(initialValues);
  // const { setAuth, persist, setPersist } = useAuth();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { postQuery } = AxiosFunction();

  const login = (email: string | undefined, password: string | undefined) => {
    const postData = { email, password };
    console.log(postData);
    postQuery(LOGIN_URL, postData)
      .then((response: AxiosResponse) => {
        const accessToken = response.data.accessToken;
        const role = response.data.idRole;
        console.log(response.data);
        //setUserInfos(response.data);
        setAuth?.({ role, accessToken });
        navigation.navigate("BotMenu", {
          screen: "Booking"
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Adresse mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.text}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Se connecter"
          color={colors.primary}
          onPress={() => {
            login(email, password);
          }}
        />
      </View>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text>Inscription </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  text: {
    color: colors.text,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  button: {
    position: "absolute",
    bottom: 0,
    height: 60,
    alignItems: "center",
  },
});

export default LoginScreen;
