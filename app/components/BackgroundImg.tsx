import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const BackgroundImg = () => {
  return (
    <>
      <Image
        source={require("../assets/img/form1.png")}
        style={styles.image1}
      />
      <Image
        source={require("../assets/img/form2.png")}
        style={styles.image2}
      />
      <Image
        source={require("../assets/img/form3.png")}
        style={styles.image3}
      />
      <Image
        source={require("../assets/img/form4.png")}
        style={styles.image4}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image1: {
    position: "absolute",
    width: 300,
    height: 201.21,
    left: -108,
    top: 451,
  },
  image2: {
    position: "absolute",
    width: 220,
    height: 172.67,
    left: 232,
    top: 10,
  },
  image3: {
    position: "absolute",
    width: 250,
    height: 224.3,
    left: 237,
    top: 30,
  },
  image4: {
    position: "absolute",
    width: 300,
    height: 341.59,
    left: -150,
    top: 269,
  },
});

export default BackgroundImg;
