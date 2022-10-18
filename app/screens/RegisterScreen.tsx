import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import BackgroundImg from "../components/BackgroundImg";
import colors from "../config/colors";
import { AxiosFunction } from "../api/AxiosFunction";
import * as Yup from "yup";

const REGISTER_URL = "auth/partner/register";

const RegisterScreen = () => {
  const { postQuery } = AxiosFunction();

  const validationShema = Yup.object().shape({
    email: Yup.string().email("Votre e-mail n\'est pas valide").required("Merci de remplir le champ e-mail"),
    lastName: Yup.string().matches(/^[A-Za-z ]+$/, "Le nom doit contenir que des lettres.").required("Merci de remplir le champ nom"),
    firstName: Yup.string().matches(/^[A-Za-z ]+$/, "Le prenom doit contenir que des lettres.").required("Merci de remplir le champ prenom"),
    password: Yup.string().min(6, "Mot de passe trop court").max(50, "Mot de passe trop long").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/, "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre.").required("Merci de remplir le champ mot de passe"),
    phone: Yup.string().required("Merci de remplir le champ numéro de téléphone."),
    address: Yup.string().required("Merci de remplire le champ adresse"),
    postalCode: Yup.number().required("Merci de remplire le champ code postal"),
    city: Yup.string().required("Merci de remplire le champ ville"),
});

  const register = () => {};

  return (
    <>
      <BackgroundImg />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Prénom</Text>
          <TextInput
            style={styles.input}
            placeholder="Mickaël"
          />
          <Text style={styles.text}>Nom</Text>
          <TextInput
            style={styles.input}
            placeholder="Noel"
          />
          <Text style={styles.text}>Adresse mail</Text>
          <TextInput
            style={styles.input}
            placeholder="mickael.noel@exemple.com"
          />
          <Text style={styles.text}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
          />
          <Text style={styles.text}>Adresse</Text>
          <TextInput
            style={styles.input}
            placeholder="55 avenue de la bonne aventure"
          />
          <Text style={styles.text}>Code postal</Text>
          <TextInput
            style={styles.input}
            placeholder="75009"
          />
          <Text style={styles.text}>Ville</Text>
          <TextInput
            style={styles.input}
            placeholder="Paris"
          />
          <Text style={styles.text}>Numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="0601020304"
          />
        </View>
        <View style={styles.button}>
          <Button title="S'inscrire" color={colors.primary} />
        </View>
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  text: {
    color: colors.text,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  button: {
    position: "absolute",
    bottom: 0,
    height: 60,
    alignItems: "center",
  },
});
