import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { AxiosFunction } from "../api/AxiosFunction";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../components/Form/InputGroup";
import SubmitButton from "../components/Form/Button";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const CHANGE_PERSONNAL_INFO_URL = "partner/personnal-info";
const GETPROFILE_URL = "/partner/profile/";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const ProfilePersoInfoScreen = () => {
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // DateTimePicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);
  const [birthdatePicker, setBirthdatePicker] = useState();

  // ajouter le get des infos personnelles
  const { patchQuery, getQuery } = AxiosFunction();

  useEffect(() => {
    getQuery(GETPROFILE_URL)
      .then((response: AxiosResponse) => {
        if (response.data.partner.birthdate != null)
          setBirthdatePicker(response.data.partner.birthdate);

        let firstName = "Prénom";
        let lastName = "Nom";
        let email = "Adresse mail";
        let phone = "Numéro de téléphone";

        if (response.data.firstName != null)
          firstName = response.data.firstName;

        if (response.data.lastName != null) lastName = response.data.lastName;

        if (response.data.email != null) email = response.data.email;

        if (response.data.partner.phone != null)
          phone = response.data.partner.phone;

        setFormValues({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        });
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage(
          "Erreur lors de la récupération des informations personnelles."
        );
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
    phone: Yup.string().required("Merci de remplir le champ ci-dessus."),
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

  const changePersoInfo = (data: FormValues) => {
    const { firstName, lastName, email, phone } = data;
    const birthdate = date;
    const postData = {
      firstName,
      lastName,
      email,
      phone,
      birthdate,
    };
    patchQuery(CHANGE_PERSONNAL_INFO_URL, postData)
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

  // DateTimePicker
  const onDateSelected = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

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
                name="lastName"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    value={value}
                    defaultValue={formValues.lastName}
                    placeholder="Nom de famille"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!error}
                    errorDetails={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="firstName"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    value={value}
                    defaultValue={formValues.firstName}
                    placeholder="Prénom"
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
                    defaultValue={formValues.email}
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
                name="phone"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    placeholder="Numéro de téléphone"
                    defaultValue={formValues.phone}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!error}
                    errorDetails={error?.message}
                  />
                )}
              />
              <Text style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                Date de naissance :{" "}
                {moment(birthdatePicker).format("DD/MM/YYYY")}
              </Text>
            </View>

            <View style={styles.input}>
              <View style={{ marginBottom: 50 }}>
                <Button
                  color={colors.tertiary}
                  title="Séléctionner votre date de naissance"
                  onPress={() => showMode("date")}
                />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  locale="fr-FR"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onDateSelected}
                />
              )}

              <SubmitButton
                title="Enregistrer les informations"
                onPress={handleSubmit(changePersoInfo)}
              />
            </View>
          </View>
        </ScrollView>
        <View>
          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={["25%"]}
            backdropComponent={renderBackdrop}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.textModal}>Informations enregistrés. 🎉</Text>
              <Text>
                Vos informations personnelles ont bien été enregistrés.
              </Text>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ProfilePersoInfoScreen;

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
