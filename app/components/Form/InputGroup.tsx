import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import colors from "../../config/colors";

type InputGroupProps = {
  label?: string;
  placeholder?: string;
  value: string;
  password?: boolean;
  type?: KeyboardTypeOptions;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  errorDetails?: string;
};

const InputGroup = ({
  label,
  placeholder,
  value,
  password,
  type = "default",
  onChangeText,
  onBlur,
  error = false,
  errorDetails,
}: InputGroupProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={password}
        keyboardType={type}
        style={[styles.input, error ? styles.inputBorderError : styles.inputBorder]}
      />
      {errorDetails && (
        <Text style={styles.errorText}>{errorDetails}</Text>
      )}
    </View>
  );
};

export default InputGroup;

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
    with: "auto"
  },
});
