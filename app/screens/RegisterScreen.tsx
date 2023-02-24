import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import routes from "../navigation/routes";
import BackgroundImg from "../components/BackgroundImgRegister";

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
  const bottomSheetRef = useRef<BottomSheetModal>(null);

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

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

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
        console.log("success");
        clearErrors();
        bottomSheetRef.current?.present();
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage(error.response?.data);
      });
  };

  const goToLogin = () => {
    navigation.navigate(routes.LOGIN);
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
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
      <BackgroundImg />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.error}>
              {error && <ErrorMessage title={errorMessage} />}
            </View>

            <View style={styles.form}>
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
            </View>
            <View style={styles.input}>
              <Button title="S'inscrire" onPress={handleSubmit(register)} />
            </View>
          </View>
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={["25%"]}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.textModal}>
              Félicitations, votre compte a bien été créé. 🎉
            </Text>
            <Text>
              Vous pouvez à présent vous connecter afin de pouvoir commencer à
              accepter les prestation souhaitées.
            </Text>
            <Button title="Se connecter" onPress={goToLogin} />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
  },
  form: {
    width: "80%",
  },
  text: {
    color: colors.text,
  },
  input: {
    width: "80%",
    marginHorizontal: 30,
  },
  error: {
    marginTop: 40,
    width: "80%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  textModal: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
