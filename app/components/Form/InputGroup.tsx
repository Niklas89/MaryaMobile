import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../config/colors";

type InputGroupProps = {
  label?: string;
  placeholder?: string;
  value: string;
  defaultValue?: string,
  password?: boolean;
  type?: KeyboardTypeOptions;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: boolean;
  errorDetails?: string;
};

const InputGroup = ({
  label,
  placeholder,
  defaultValue,
  value,
  password,
  type = "default",
  onChangeText,
  error = false,
  errorDetails,
}: InputGroupProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#929294"
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        secureTextEntry={password}
        keyboardType={type}
        style={[
          styles.input,
          error ? styles.inputBorderError : (isFocus ? styles.inputBorderFocus : styles.inputBorder),
        ]}
      />
      {errorDetails && <Text style={styles.errorText}>{errorDetails}</Text>}
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
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  inputBorderFocus: {
    borderBottomWidth: 2,
    borderColor: colors.text,
  },
  inputBorderError: {
    borderBottomWidth: 2,
    borderColor: colors.red,
  },
  input: {
    marginBottom: 15,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  errorText: {
    color: colors.red,
    fontWeight: "bold",
    marginBottom: 6,
    with: "auto",
  },
});
