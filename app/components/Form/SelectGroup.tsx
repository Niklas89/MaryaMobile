import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import { Picker } from "@react-native-picker/picker";

interface IData {
  id: number;
  name: string;
}

type SelectGroupProps = {
  label?: string;
  value: string;
  data?: Array<IData>;
  onValueChange: (value: string) => void;
  error?: boolean;
  errorDetails?: string;
};

const SelectGroup = ({
  label,
  value,
  data,
  onValueChange,
  error = false,
  errorDetails,
}: SelectGroupProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={[styles.select, styles.selectBorder]}
      >
        <Picker.Item
          label="Choisir la catégorie"
          style={styles.placeholder}
          enabled={false}
          value=""
        />
        {data &&
          data.map((service) => {
            return (
              <Picker.Item
                label={service.name}
                style={styles.item}
                value={service.id}
              />
            );
          })}
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
    fontWeight: "bold",
  },
  selectBorder: {
    borderColor: colors.grey,
  },
  selectBorderError: {
    borderColor: colors.red,
  },
  select: {
    marginBottom: 20
  },
  errorText: {
    color: colors.red,
    fontWeight: "bold",
    marginBottom: 6,
    with: "auto",
  },
  placeholder: {
    fontSize: 14,
    paddingVertical: 2,
    color: "#929294",
  },
  item: {
    fontSize: 14,
  },
});
