import { StyleSheet, View } from "react-native";
import React from "react";
import BackgroundImg from "../components/BackgroundImg";
import colors from "../config/colors";
import { AxiosFunction } from "../api/AxiosFunction";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../components/Form/InputGroup";
import Button from "../components/Form/Button";
import { AxiosError, AxiosResponse } from "axios";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import SelectGroup from "../components/Form/SelectGroup";

const REGISTER_URL = "auth/partner/register";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
};
type ScreenNavigationProp<T extends keyof RouteParams> = StackNavigationProp<
  RouteParams,
  T
>;

type ScreenRouteProp<T extends keyof RouteParams> = RouteProp<RouteParams, T>;
type Props<T extends keyof RouteParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const RegisterScreen: React.FC<Props<"Register">> = ({ navigation }) => {
  const values = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  };
  const { postQuery } = AxiosFunction();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Votre e-mail n'est pas valide.")
      .required("Merci de remplir le champ ci-dessus."),
    lastName: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Le nom doit contenir que des lettres.")
      .required("Merci de remplir le champ ci-dessus."),
    firstName: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Le prenom doit contenir que des lettres.")
      .required("Merci de remplir le champ ci-dessus."),
    password: Yup.string()
      .min(6, "Mot de passe trop court")
      .max(50, "Mot de passe trop long")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/,
        "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre."
      )
      .required("Merci de remplir le champ ci-dessus."),
    phone: Yup.string().required("Merci de remplir le champ ci-dessus."),
    address: Yup.string().required("Merci de remplir le champ ci-dessus."),
    postalCode: Yup.number().required(
      "Merci de remplir le champ code ci-dessus."
    ),
    city: Yup.string().required("Merci de remplir le champ ci-dessus."),
  });

  const register = (data: FormValues) => {
    const idCategory = 1;
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      postalCode,
      phone,
    } = data;
    const postData = {
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      postalCode,
      phone,
      idCategory,
    };
    postQuery(REGISTER_URL, postData)
      .then((response: AxiosResponse) => {
        clearErrors();
        navigation.navigate("Booking");
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
    <>
      <View style={styles.container}>
        <BackgroundImg />
        <View style={styles.form}>
          <Controller
            control={control}
            name="firstName"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <InputGroup
                label="Prénom"
                value={value}
                placeholder="Mickael"
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <InputGroup
                label="Nom"
                value={value}
                placeholder="Noël"
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <InputGroup
                label="Adresse mail"
                value={value}
                placeholder="mickael.noel@marya.fr"
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
                label="Mot de passe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                password
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <InputGroup
                label="Adresse"
                value={value}
                placeholder="143 Rue Yves le Coz"
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <InputGroup
                label="Ville"
                value={value}
                placeholder="Versailles"
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="postalCode"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <InputGroup
                label="Code postal"
                value={value}
                placeholder="78000"
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <InputGroup
                label="Numéro de téléphone"
                value={value}
                placeholder="0601020304"
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <SelectGroup label="Catégorie" value={value} onValueChange={onChange}/>
            )}
          />
        </View>
        <View style={styles.button}>
          <Button title="S'inscrire" onPress={handleSubmit(register)} />
        </View>
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
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
    width: "60%",
    margin: 10,
  },
});
