import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import { AxiosError, AxiosResponse } from "axios";
import { AxiosFunction } from "../api/AxiosFunction";

type IModalBooking = {
  id: number;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  bookingAccepted: number;
  setBookingAccepted: (value: number) => void;
};

const ModalBooking = ({ id, modalVisible, setModalVisible, bookingAccepted , setBookingAccepted }: IModalBooking) => {
  const [error, setError] = useState<boolean>(false);

  const { patchQuery } = AxiosFunction();

  const acceptBooking = (idBooking: number) => {
    patchQuery(`booking/${idBooking?.toString()}`, {})
      .then((response: AxiosResponse) => {
        setBookingAccepted(bookingAccepted + 1)
        //Si l'enregistrement ce fait alors on dirige vers le planning
        setModalVisible(false);
      })
      .catch((error: AxiosError) => {
        setError(true);
      });
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <Pressable
          style={styles.closePressable}
          onPress={() => setModalVisible(false)}
        >
          <Ionicons name="md-close-sharp" size={24} color="black" />
        </Pressable>
        <View>
          <Text style={styles.textModal}>Etes-vous sûr d'accepter la prestation ?</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Refuser"
              onPress={() => setModalVisible(false)}
              color="#C5C5C7"
            />
            <Button
              title="Accepter"
              onPress={() => acceptBooking(id)}
              color="#035A5A"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBooking;

const styles = StyleSheet.create({
  modalView: {
    marginTop: 120,
    margin: 10,
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 5,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closePressable: {
    alignItems: "flex-end",
  },
  textModal: {
    textAlign: "center",
    color: colors.text,
    fontSize: 16,
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});
