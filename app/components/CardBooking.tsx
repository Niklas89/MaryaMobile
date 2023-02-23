import { Pressable, StyleSheet, Text, View } from "react-native";
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

type Booking = {
  booking: {
    id?: number;
    accepted: boolean;
    appointmentDate: string;
    description: string;
    nbHours: number;
    totalPrice: number;
    idService: number;
    idClient: number;
  };
  index: number;
};

const CardBooking = ({ booking, index }: Booking) => {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<IService>();
  const [clientData, setClientData] = useState<IUser>();
  const [colorSelected, setColorSelected] = useState<string>();

  const { getQuery } = AxiosFunction();

  const colorBackground = [colors.secondary, colors.tertiary];

  useEffect(() => {
    index % 2 === 0 && setColorSelected(colors.secondary);
    index % 2 === 1 && setColorSelected(colors.tertiary);
  }, []);

  useEffect(() => {
    getQuery(`partner/client/${booking?.idClient?.toString()}`).then(
      (res: AxiosResponse) => {
        //on recupére l'id client
        setClientData(res.data.client);
        getQuery(`/service/${booking?.idService?.toString()}`).then(
          (res: AxiosResponse) => {
            setServiceData(res.data);
          }
        );
      }
    );
  }, []);

  return (
    <>
      <Pressable
        onPress={() => setOpenCard(!openCard)}
        style={[styles.cardContainer, { backgroundColor: colorSelected }]}
      >
        <View style={styles.dataContainer}>
          <View style={[styles.rowContainer, { marginVertical: 4 }]}>
            <Text style={styles.text}>{serviceData && serviceData.name}</Text>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="calendar-blank-multiple"
                size={18}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.text}>
                {moment(booking.appointmentDate).format("DD/MM/YYYY à hh:mm")}
              </Text>
            </View>
          </View>
          {openCard && (
            <>
              <Text style={[styles.text, { marginVertical: 4 }]}>
                {booking.description}
              </Text>
              <View style={[styles.rowContainer, { marginVertical: 4 }]}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="time"
                    size={18}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.text}>{booking.nbHours} heures</Text>
                </View>
                <View style={styles.iconContainer}>
                  <FontAwesome
                    name="euro"
                    size={18}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.text}>{booking.totalPrice} €</Text>
                </View>
              </View>
              <View style={[styles.iconContainer, { marginVertical: 4 }]}>
                <Entypo
                  name="address"
                  size={18}
                  color="white"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.text}>
                  {clientData && clientData.address}{" "}
                  {clientData && clientData.postalCode}{" "}
                  {clientData && clientData.city}
                </Text>
              </View>
            </>
          )}
        </View>
      </Pressable>
    </>
  );
};

export default CardBooking;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    marginBottom: 1,
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
