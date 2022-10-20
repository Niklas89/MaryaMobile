import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundImg from "../components/BackgroundImg";

type Props = {};

const SuccessScreen = (props: Props) => {
  return (
    <View>
      <BackgroundImg />
      <View>
        <Text>
          Votre compte a bien été crée. Vous pouvez dès a présent vous connecter
          en cliquant sur le bouton ci-dessous :
        </Text>
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({});
