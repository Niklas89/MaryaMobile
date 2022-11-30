import React, { useEffect, useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { AxiosFunction } from "../api/AxiosFunction";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../components/Form/InputGroup";
import Button from "../components/Form/Button";
import { AxiosError, AxiosResponse } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import useAuth from "../hooks/useAuth";
import authStorage from "../auth/storage";

const CHANGEPASSWORD_URL = "user/edit-password";
const LOGOUT_URL = "/logout/";

type FormValues = {
  lastPassword: string;
  newPassword: string;
};

const ProfilePasswordScreen = () => {
  const values = {
    lastPassword: "",
    newPassword: "",
  };

  const { auth, setAuth } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { patchQuery, getQuery } = AxiosFunction();

  const validationSchema = Yup.object().shape({
    lastPassword: Yup.string().required("Merci de remplir le champ ci-dessus."),
    newPassword: Yup.string()
      .min(6, "Mot de passe trop court")
      .max(50, "Mot de passe trop long")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/,
        "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre."
      )
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

  const changePassword = (data: FormValues) => {
    const { lastPassword, newPassword } = data;

    const postData = {
      lastPassword,
      newPassword,
    };
    patchQuery(CHANGEPASSWORD_URL, postData)
      .then((response: AxiosResponse) => {
        clearErrors();
        bottomSheetRef.current?.present();
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage("Ancien mot de passe incorrect.");
      });
  };

  const logout = () => {
    getQuery(LOGOUT_URL)
      .then((response: AxiosResponse) => {
        authStorage.removeToken();
        setAuth?.({});
      })
      .catch(() => {
        setError(true);
        setErrorMessage("La déconnection a échoué. Veuillez nous contacter.");
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
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.error}>
              {error && <ErrorMessage title={errorMessage} />}
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="lastPassword"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    value={value}
                    placeholder="Ancien Mot de Passe"
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
                name="newPassword"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    value={value}
                    placeholder="Nouveau Mot de Passe"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    password
                    error={!!error}
                    errorDetails={error?.message}
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Button
                title="Enregistrer"
                onPress={handleSubmit(changePassword)}
              />
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
              Félicitations, votre mot de passe a bien été changé. 🎉
            </Text>
            <Text>
              Vous pouvez à présent vous déconnecter et vous reconnecter avec
              votre nouveau mot de passe.
            </Text>
            <Button title="Se déconnecter" onPress={logout} />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ProfilePasswordScreen;

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
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
    marginTop: 10,
  },
  error: {
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
