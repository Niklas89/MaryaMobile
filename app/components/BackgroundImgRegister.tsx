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
    left: -128,
    top: 541,
  },
  image2: {
    position: "absolute",
    width: 220,
    height: 172.67,
    left: 282,
    top: 0,
  },
  image3: {
    position: "absolute",
    width: 250,
    height: 224.3,
    left: 267,
    top: 10,
  },
  image4: {
    position: "absolute",
    width: 300,
    height: 381.59,
    left: -195,
    top: 419,
  },
});

export default BackgroundImg;
