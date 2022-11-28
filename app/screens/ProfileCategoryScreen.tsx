import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { AxiosFunction } from "../api/AxiosFunction";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectGroup from "../components/Form/SelectGroup";
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

const CHANGE_CATEGORY_URL = "partner/category";
const GETPROFILE_URL = "/partner/profile/";
const GETCATEGORY_URL = "/service/category";

interface IData {
  id: number;
  name: string;
}

type FormValues = {
  idCategory: string;
};

const ProfileCategoryScreen = () => {
  const [services, setServices] = useState<Array<IData>>();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [actualCategoryId, setActualCategoryId] = useState<number>();
  const [actualCategoryName, setActualCategoryName] = useState<string>();
  const [formValues, setFormValues] = useState<FormValues>({
    idCategory: "idCategory",
  });

  const { patchQuery, getQuery } = AxiosFunction();

  useEffect(() => {
    getQuery(GETCATEGORY_URL)
      .then((response: AxiosResponse) => {
        setServices(response.data);
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage(
          "Erreur lors de la récupération de la liste des services."
        );
      });
  }, []);

  useEffect(() => {
    getQuery(GETPROFILE_URL)
      .then((response: AxiosResponse) => {
        let idCategory = "idCategory";

        if (response.data.partner.idCategory != null)
          idCategory = response.data.partner.idCategory;

        let categoryId: number = parseInt(idCategory)
          ? parseInt(idCategory)
          : 0;
        setActualCategoryId(categoryId);

        let categoryName: string | undefined = services?.find(
          (x) => x.id === categoryId
        )?.name;
        setActualCategoryName(categoryName);

        setFormValues({
          idCategory: idCategory,
        });
      })
      .catch((error: AxiosError) => {
        setError(true);
        setErrorMessage("Erreur lors de la récupération de la catégorie.");
      });
  }, [services]);

  const validationSchema = Yup.object().shape({
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

  const changeCategory = (data: FormValues) => {
    let idCategory = parseInt(data.idCategory);
    const postData = {
      idCategory,
    };
    patchQuery(CHANGE_CATEGORY_URL, postData)
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
              <Text>
                <Text>Catégorie de prestation actuelle:</Text>{" "}
                <Text style={{ fontWeight: "bold" }}>{actualCategoryName}</Text>
              </Text>
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

              <Button
                title="Enregistrer"
                onPress={handleSubmit(changeCategory)}
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
            <Text style={styles.textModal}>Catégorie enregistrée. 🎉</Text>
            <Text>Votre catégorie de service a bien été enregistré.</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ProfileCategoryScreen;

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
