import React, { useCallback, useEffect, useRef, useState } from "react";
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

const CHANGE_PROFESSIONAL_INFO_URL = "partner/professional-info";
const GETPROFILE_URL = "/partner/profile/";

type FormValues = {
  IBAN: string;
  SIRET: string;
};

const ProfileBankDetailsScreen = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    IBAN: "",
    SIRET: "",
  });

  const { patchQuery, getQuery } = AxiosFunction();

  useEffect(() => {
    getQuery(GETPROFILE_URL)
      .then((response: AxiosResponse) => {
        let IBAN = "IBAN";
        let SIRET = "SIRET";

        if (response.data.partner.IBAN != null)
          IBAN = response.data.partner.IBAN;

        if (response.data.partner.SIRET != null)
          SIRET = response.data.partner.SIRET;

        setFormValues({
          IBAN: IBAN,
          SIRET: SIRET,
        });
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage(
          "Erreur lors de la récupération des informations bancaires."
        );
      });
  }, []);

  const validationSchema = Yup.object().shape({
    IBAN: Yup.string()
      .matches(
        /^[A-Za-z0-9]+$/,
        "L'IBAN doit contenir que des lettres et des chiffres."
      )
      .required("Merci de remplir le champ ci-dessus."),
    SIRET: Yup.string()
      .matches(
        /^[A-Za-z0-9]+$/,
        "Le SIRET doit contenir que des lettres et des chiffres."
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

  const changeProInfo = (data: FormValues) => {
    const { IBAN, SIRET } = data;
    const postData = {
      IBAN,
      SIRET,
    };
    patchQuery(CHANGE_PROFESSIONAL_INFO_URL, postData)
      .then((response: AxiosResponse) => {
        clearErrors();
        bottomSheetRef.current?.present();
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage("Une ou plusieurs valeurs envoyées sont incorrects.");
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
                name="IBAN"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    value={value}
                    defaultValue={formValues.IBAN}
                    placeholder="IBAN"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!error}
                    errorDetails={error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="SIRET"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    value={value}
                    defaultValue={formValues.SIRET}
                    placeholder="SIRET"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!error}
                    errorDetails={error?.message}
                  />
                )}
              />

              <Button
                title="Enregistrer"
                onPress={handleSubmit(changeProInfo)}
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
            <Text style={styles.textModal}>Informations enregistrés. 🎉</Text>
            <Text>Vos informations bancaires ont bien été enregistrés.</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ProfileBankDetailsScreen;

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
