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

const CHANGE_ADDRESS_INFO_URL = "partner/address";
const GETPROFILE_URL = "/partner/profile/";

type FormValues = {
  address: string;
  postalCode: string;
  city: string;
};

const ProfileAddressScreen = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    address: "address",
    postalCode: "postalCode",
    city: "city",
  });

  const { patchQuery, getQuery } = AxiosFunction();

  useEffect(() => {
    getQuery(GETPROFILE_URL)
      .then((response: AxiosResponse) => {
        let address = "address";
        let postalCode = "postalCode";
        let city = "city";

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
            <Text>Votre adresse a bien été enregistré.</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ProfileAddressScreen;

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
