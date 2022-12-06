import React, { useEffect, useMemo, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { AxiosFunction } from "../api/AxiosFunction";
import * as Yup from "yup";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../components/Form/InputGroup";
import SubmitButton from "../components/Form/Button";
import { AxiosError, AxiosResponse } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import Toast from "react-native-root-toast";

const CHANGE_PERSONNAL_INFO_URL = "partner/personnal-info";
const GETPROFILE_URL = "/partner/profile/";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const ProfilePersoInfoScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  const [formValues, setFormValues] = useState<FormValues>();

  // DateTimePicker
  const [date, setDate] = useState(new Date());
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
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 2500);
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage("Une ou plusieurs valeurs envoyées sont incorrects.");
      });
  };

  // DateTimePicker
  const onDateSelected = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setShow(false);
    selectedDate && setDate(selectedDate);
  };

  const {
    control,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: useMemo(() => formValues, [formValues]),
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(formValues);
  }, [formValues]);

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
              name="lastName"
              render={({
                formState: { defaultValues },
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputGroup
                  value={value}
                  defaultValue={defaultValues?.lastName}
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
                formState: { defaultValues },
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <InputGroup
                  value={value}
                  defaultValue={defaultValues?.firstName}
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
                formState: { defaultValues },
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <InputGroup
                  value={value}
                  defaultValue={defaultValues?.email}
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
                formState: { defaultValues },
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <InputGroup
                  placeholder="Numéro de téléphone"
                  defaultValue={defaultValues?.phone}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!error}
                  errorDetails={error?.message}
                />
              )}
            />
            <View
              style={{
                marginBottom: 10,
                marginTop: 10,
                borderBottomWidth: 1,
                borderColor: colors.grey,
              }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  marginBottom: 10,
                }}
              >
                {moment(date).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>

          <View style={styles.input}>
            <View style={{ marginBottom: 50 }}>
              <Button
                color={colors.tertiary}
                title="Séléctionner votre date de naissance"
                onPress={() => setShow(true)}
              />
            </View>
            {show && (
              <DateTimePicker
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
