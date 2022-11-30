import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import routes from "../navigation/routes";

const RESETPASSWORD_URL = "/auth/reset";

type FormValues = {
  email: string;
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

const ResetPasswordScreen: React.FC<Props<"ResetPassword">> = ({
  navigation,
}) => {
  const values = {
    email: "",
  };

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { postQuery } = AxiosFunction();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Votre e-mail n'est pas valide.")
      .required("Merci de remplir le champ ci-dessus."),
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

  const resetPassword = (data: FormValues) => {
    const { email } = data;

    const postData = {
      email,
    };
    postQuery(RESETPASSWORD_URL, postData)
      .then((response: AxiosResponse) => {
        clearErrors();
        bottomSheetRef.current?.present();
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage(
          "L'email qui vous avez renseigné n'existe pas dans notre base."
        );
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
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BackgroundImg />
        <View style={styles.error}>
          {error && <ErrorMessage title={errorMessage} />}
        </View>
        <Text style={styles.error}>
          Vous avez oublié votre mot de passe ? Renseignez votre adresse email
          ci-dessous et vous recevrez un lien où vous pourrez réinitialiser
          votre mot de passe.
        </Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputGroup
                value={value}
                placeholder="Votre adresse e-mail"
                onChangeText={onChange}
                error={!!error}
                errorDetails={error?.message}
              />
            )}
          />
        </View>
        <View style={styles.input}>
          <Button title="Envoyer" onPress={handleSubmit(resetPassword)} />
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={["25%"]}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.textModal}>
            Félicitations, l'email a bien été envoyé. 🎉
          </Text>
          <Text>
            Vous pouvez à présent définir votre nouveau mot de passe en cliquant
            sur le lien dans l'email qui vous a été envoyé.
          </Text>
          <Button title="Se connecter" onPress={goToLogin} />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
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
    marginBottom: 40,
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
