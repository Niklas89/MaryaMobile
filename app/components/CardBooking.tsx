import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import { IBooking } from "../interfaces/IBooking";
import moment from "moment";
import { AxiosResponse } from "axios";
import { AxiosFunction } from "../api/AxiosFunction";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IService } from "../interfaces/IService";
import { IUser } from "../interfaces/IUser";

const CardBooking = ({ data }: IBooking) => {
  const [serviceData, setServiceData] = useState<IService>();
  const [clientData, setClientData] = useState<IUser>();

  const { getQuery } = AxiosFunction();

  const colorBackground = [
    colors.primary,
    colors.secondary,
    colors.tertiary,
    colors.quaternary,
    colors.quinary,
  ];
  const randomNumber = Math.floor(Math.random() * colorBackground.length);

  useEffect(() => {
    getQuery(`partner/client/${data?.idClient?.toString()}`).then(
      (res: AxiosResponse) => {
        //on recupére l'id client
        setClientData(res.data.client);
      }
    );

    getQuery(`/service/${data?.idService?.toString()}`).then(
      (res: AxiosResponse) => {
        setServiceData(res.data);
      }
    );
  }, []);

  return data && clientData && serviceData ? (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: colorBackground[randomNumber] },
      ]}
    >
      <View style={styles.dataContainer}>
        <View style={[styles.rowContainer, { marginVertical: 4}]}>
          <Text style={styles.text}>{serviceData.name}</Text>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="calendar-blank-multiple"
              size={18}
              color="white"
              style={{marginRight: 5}}
            />
            <Text style={styles.text}>
              {moment(data.appointmentDate).format("DD/MM/YYYY à hh:mm")}
            </Text>
          </View>
        </View>
        <Text style={[styles.text, { marginVertical: 4}]}>{data.description}</Text>
        <View style={[styles.rowContainer, { marginVertical: 4}]}>
          <View style={styles.iconContainer}>
            <Ionicons name="time" size={18} color="white" style={{marginRight: 5}}/>
            <Text style={styles.text}>{data.nbHours} heures</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome name="euro" size={18} color="white" style={{marginRight: 5}}/>
            <Text style={styles.text}>{data.totalPrice} €</Text>
          </View>
        </View>
        <View style={[styles.iconContainer, { marginVertical: 4}]}>
          <Entypo name="address" size={18} color="white" style={{marginRight: 5}}/>
          <Text style={styles.text}>
            {clientData.address} {clientData.postalCode} {clientData.city}
          </Text>
        </View>
      </View>
    </View>
  ) : (
    <Text>Soucis</Text>
  );
};

export default CardBooking;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    marginBottom: 5,
  },
  dataContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
  },
  text: {
    color: colors.white,
    fontSize: 13,
  },
});
