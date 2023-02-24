import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { Platform } from "react-native";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";

interface IData {
  id: number;
  name: string;
}

type SelectGroupProps = {
  label?: string;
  value: string;
  data?: Array<IData>;
  onValueChange?: (value: string) => void;
  onValueChangeIOS?: (itemValue: ItemValue, itemIndex: number) => void;
  error?: boolean;
  errorDetails?: string;
};

const SelectGroup = ({
  label,
  value,
  data,
  onValueChange,
  onValueChangeIOS,
  error = false,
  errorDetails,
}: SelectGroupProps) => {
  console.log(Platform.OS);
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      {Platform.OS === "android" && (
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
                  key={service.id}
                  label={service.name}
                  style={styles.item}
                  value={service.id}
                />
              );
            })}
        </Picker>
      )}
      {Platform.OS === "ios" && (
        <PickerIOS
          selectedValue={value}
          onValueChange={onValueChangeIOS}
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
                  key={service.id}
                  label={service.name}
                  style={styles.item}
                  value={service.id}
                />
              );
            })}
        </PickerIOS>
      )}
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
    marginBottom: 20,
    fontSize: 16,
  },
  errorText: {
    color: colors.red,
    fontWeight: "bold",
    marginBottom: 6,
    with: "auto",
  },
  placeholder: {
    fontSize: 16,
    paddingVertical: 2,
    color: "#929294",
  },
  item: {
    fontSize: 14,
  },
});
