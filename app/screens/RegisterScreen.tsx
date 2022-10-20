import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import SelectGroup from "../components/Form/SelectGroup";
import ErrorMessage from "../components/ErrorMessage";

const REGISTER_URL = "auth/partner/register";
const GETCATEGORY_URL = "service/category";

interface IData {
  id: number;
  name: string;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  idCategory: string;
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
    idCategory: "",
  };

  const [services, setServices] = useState<Array<IData>>();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();

  const { postQuery, getQuery } = AxiosFunction();

  useEffect(() => {
    getQuery(GETCATEGORY_URL)
      .then((response: AxiosResponse) => {
        setServices(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

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
    idCategory: Yup.string().required("Merci de remplir le champ ci-dessus."),
  });

  const register = (data: FormValues) => {
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

    let idCategory = parseInt(data.idCategory);

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
        //navigation.navigate("Register");
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage(error.response?.data);
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
        <View style={styles.error}>
          {error && <ErrorMessage title={errorMessage} />}
        </View>

        <View style={styles.form}>
          <ScrollView>
            <Controller
              control={control}
              name="firstName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputGroup
                  value={value}
                  placeholder="Prénom"
                  onChangeText={onChange}
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
                  value={value}
                  placeholder="Nom"
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
            <Controller
              control={control}
              name="address"
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <InputGroup
                  placeholder="Adresse"
                  value={value}
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
                  placeholder="Ville"
                  value={value}
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
                  placeholder="Code postal"
                  value={value}
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
                  placeholder="Numéro de téléphone"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!error}
                  errorDetails={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="idCategory"
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <SelectGroup
                  value={value}
                  data={services}
                  onValueChange={onChange}
                  error={!!error}
                  errorDetails={error?.message}
                />
              )}
            />
          </ScrollView>
        </View>
        <View style={styles.input}>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  form: {
    width: "80%",
  },
  text: {
    color: colors.text,
  },
  input: {
    marginBottom: 40,
    width: "80%",
  },
  error: {
    marginTop: 40,
    width: "80%",
  },
});
