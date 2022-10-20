import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface props {
  name?: any;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
}

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
}: props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* MaterialCommunityIcons: https://github.com/expo/vector-icons/blob/master/src/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json */}
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

export default Icon;
