import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import BackgroundImg from "../components/BackgroundImg";
import colors from "../config/colors";

const RegisterScreen = () => {
  return (
    <>
      <BackgroundImg />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Prénom</Text>
          <TextInput style={styles.input} placeholder="Mickaël" />
          <Text style={styles.text}>Nom</Text>
          <TextInput style={styles.input} placeholder="Noel" />
          <Text style={styles.text}>Adresse mail</Text>
          <TextInput style={styles.input} placeholder="mickael.noel@exemple.com" />
          <Text style={styles.text}>Mot de passe</Text>
          <TextInput style={styles.input} secureTextEntry />
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
