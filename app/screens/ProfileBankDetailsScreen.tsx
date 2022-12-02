import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { AxiosFunction } from "../api/AxiosFunction";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../components/Form/InputGroup";
import Button from "../components/Form/Button";
import { AxiosError, AxiosResponse } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

const CHANGE_PROFESSIONAL_INFO_URL = "partner/professional-info";
const GETPROFILE_URL = "/partner/profile/";

type FormValues = {
  IBAN: string;
  SIRET: string;
};

const ProfileBankDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
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

  const changeProInfo = (data: FormValues) => {
    const { IBAN, SIRET } = data;
    const postData = {
      IBAN,
      SIRET,
    };
    patchQuery(CHANGE_PROFESSIONAL_INFO_URL, postData)
      .then((response: AxiosResponse) => {
        clearErrors();
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 4000);
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
    <>
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

            <Button title="Enregistrer" onPress={handleSubmit(changeProInfo)} />
          </View>
        </View>
      </ScrollView>
      <Toast
          visible={modalVisible}
          position={480}
          shadow={true}
          animation={true}
          hideOnPress={true}
          backgroundColor={colors.modal}
          textColor={colors.text}
          shadowColor={colors.grey}
        >
          Vos informations ont bien été enregistrées.
        </Toast>
    </>
  );
};

export default ProfileBankDetailsScreen;

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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closePressable: {
    alignItems: "flex-end",
  },
  textModal: {
    textAlign: "center",
    color: colors.text,
    marginTop: 15,
    paddingBottom: 15,
  },
});
