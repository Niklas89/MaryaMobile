import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Text from "./Text";
import colors from "../config/colors";

interface props {
  title?: any;
}

function ErrorMessage({ title }: props) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error" size={25} color="black" />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.error,
    borderRadius: 5,
    paddingLeft: 20,
    paddingVertical: 8
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
  },
});

export default ErrorMessage;
