import React from "react";
import { AxiosFunction } from "../api/AxiosFunction";
import { AxiosError, AxiosResponse } from "axios";
import useAuth from "../hooks/useAuth";
import BackgroundImg from "../components/BackgroundImg";
import colors from "../config/colors";
import { View, StyleSheet } from "react-native";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import InputGroup from "../components/Form/InputGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/Form/Button";

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

type FormValues = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<Props<"Login">> = ({ navigation }) => {
  //const [userInfo, setUserInfos] = useState<IUser>(initialValues);
  // const { setAuth, persist, setPersist } = useAuth();
  const { setAuth } = useAuth();
  const values = {
    email: "",
    password: "",
  };

  const { postQuery } = AxiosFunction();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Votre e-mail n'est pas valide.")
      .required("Merci de remplir le champ ci-dessus."),
    password: Yup.string()
      .min(6, "Mot de passe trop court")
      .max(50, "Mot de passe trop long")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/,
        "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre."
      )
      .required("Merci de remplir le champ ci-dessus."),
  });

  const login = (data: FormValues) => {
    console.log(data);

    const { email, password } = data;
    const postData = {
      email,
      password,
    };

    postQuery(LOGIN_URL, postData)
      .then((response: AxiosResponse) => {
        const accessToken = response.data.accessToken;
        const role = response.data.idRole;
        console.log(response.data);
        //setUserInfos(response.data);
        setAuth?.({ role, accessToken });
        navigation.navigate("BotMenu", {
          screen: "Booking",
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <InputGroup
              value={value}
              placeholder="Adresse mail"
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!error}
              errorDetails={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <InputGroup
              placeholder="Mot de passe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              password
              error={!!error}
              errorDetails={error?.message}
            />
          )}
        />

        <Button title="Se connecter" onPress={handleSubmit(login)} />
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
  form: {
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
});

export default LoginScreen;
