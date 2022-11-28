import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

type IBooking = {
  booking: {
    accepted: boolean;
    appointmentDate: string;
    description: string;
    id: number;
    idService: number;
    nbHours: number;
    totalPrice: number;
  };
};

const CardBooking = ({ booking }: IBooking) => {
  return (
    <View style={styles.container}>
      <Text>{booking.description}</Text>
      <Text>{booking.appointmentDate}</Text>
    </View>
  );
};

export default CardBooking;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
});
