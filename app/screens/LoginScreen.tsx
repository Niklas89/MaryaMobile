import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import BackgroundImg from "../components/BackgroundImg";
import colors from "../config/colors";

const LoginScreen = () => {
  return (
    <>
      <BackgroundImg />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Adresse mail</Text>
          <TextInput style={styles.input} placeholder="exemple@gmail.com" />
          <Text style={styles.text}>Mot de passe</Text>
          <TextInput style={styles.input} secureTextEntry />
        </View>
        <View style={styles.button}>
          <Button title="Se connecter" color={colors.primary} />
        </View>
      </View>
    </>
  );
};

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
    paddingVertical: 4
  },
  button: {
    position: "absolute",
    bottom: 0,
    height: 60,
    alignItems: "center",
  },
});

export default LoginScreen;
