import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import { Picker } from "@react-native-picker/picker";

type SelectGroupProps = {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: boolean;
  errorDetails?: string;
};

const SelectGroup = ({
  label,
  value,
  onValueChange,
  error = false,
  errorDetails,
}: SelectGroupProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Picker selectedValue={value} onValueChange={onValueChange}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      {errorDetails && <Text style={styles.errorText}>{errorDetails}</Text>}
    </View>
  );
};

export default SelectGroup;

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    marginBottom: 2,
  },
  inputBorder: {
    borderColor: colors.grey,
  },
  inputBorderError: {
    borderColor: colors.red,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 6,
    paddingLeft: 5,
    backgroundColor: colors.white,
  },
  errorText: {
    color: colors.red,
    fontWeight: "bold",
    marginBottom: 6,
    with: "auto",
  },
});
