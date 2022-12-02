import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
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
import { RootSiblingParent } from "react-native-root-siblings";

const CHANGE_ADDRESS_INFO_URL = "partner/address";
const GETPROFILE_URL = "/partner/profile/";

type FormValues = {
  address: string;
  postalCode: string;
  city: string;
};

const ProfileAddressScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();

  const [formValues, setFormValues] = useState<FormValues>({
    address: "",
    postalCode: "",
    city: "",
  });

  const { patchQuery, getQuery } = AxiosFunction();

  useEffect(() => {
    getQuery(GETPROFILE_URL)
      .then((response: AxiosResponse) => {
        let address = "Adresse";
        let postalCode = "Code Postal";
        let city = "Ville";

        if (response.data.partner.address != null)
          address = response.data.partner.address;

        if (response.data.partner.postalCode != null)
          postalCode = response.data.partner.postalCode;

        if (response.data.partner.city != null)
          city = response.data.partner.city;

        setFormValues({
          address: address,
          postalCode: postalCode,
          city: city,
        });
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage("Erreur lors de la récupération de l'adresse.");
      });
  }, []);

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Merci de remplir le champ ci-dessus."),
    postalCode: Yup.string()
      .matches(/^[0-9]+$/, "Le code postal doit contenir que des chiffres.")
      .required("Merci de remplir le champ ci-dessus."),
    city: Yup.string().required("Merci de remplir le champ ci-dessus."),
  });

  const changeAddress = (data: FormValues) => {
    const { address, postalCode, city } = data;
    const postData = {
      address,
      postalCode,
      city,
    };
    patchQuery(CHANGE_ADDRESS_INFO_URL, postData)
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
    <RootSiblingParent>
      <View>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.error}>
              {error && <ErrorMessage title={errorMessage} />}
            </View>
            <View style={styles.form}>
              <Controller
                control={control}
                name="address"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputGroup
                    value={value}
                    defaultValue={formValues.address}
                    placeholder="Adresse"
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
                    value={value}
                    defaultValue={formValues.postalCode}
                    placeholder="Code postal"
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
                    value={value}
                    defaultValue={formValues.city}
                    placeholder="Ville"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!error}
                    errorDetails={error?.message}
                  />
                )}
              />
              <Button
                title="Enregistrer"
                onPress={handleSubmit(changeAddress)}
              />
            </View>
            <View></View>
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
      </View>
    </RootSiblingParent>
  );
};

export default ProfileAddressScreen;

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
    marginTop: 160,
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
