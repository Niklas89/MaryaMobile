import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

interface props {
  children: JSX.Element | React.ReactElement | JSX.Element[];
  style: any;
  otherProps?: JSX.IntrinsicAttributes;
  numberOfLines?: number;
}

function AppText({ children, style, ...otherProps }: props) {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
