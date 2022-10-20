import { StyleSheet, Button } from "react-native";
import React from "react";
import colors from "../../config/colors";

type ButtonProps = {
  title: string;
  type?: "primary" | "secondary";
  onPress: () => void;
};

const SubmitButton = ({ type, title, onPress }: ButtonProps) => {
  return <Button color={colors.primary} title={title} onPress={onPress} />;
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
  },
});
