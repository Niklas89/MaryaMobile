import { AxiosResponse } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AxiosFunction } from "../api/AxiosFunction";
import { IUser } from "../interfaces/Iclient";
import { IService } from "../interfaces/IService";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

interface IData {
  data: {
    id: number;
    appointmentDate: string;
    description: string;
    nbHours: number;
    totalPrice: number;
    idService: number;
    message: string;
    idClient: number;
  };
  setModalVisible: (value: boolean) => void;
  setIdBookingSelected: (value: number) => void;
}

const CardRequestBooking = ({ data, setModalVisible, setIdBookingSelected }: IData) => {
  const { getQuery } = AxiosFunction();

  const [serviceData, setServiceData] = useState<IService>();
  const [clientData, setClientData] = useState<IUser>();

  useEffect(() => {
    getQuery(`partner/client/${data?.idClient?.toString()}`).then(
      (res: AxiosResponse) => {
        //on recupére l'id client
        setClientData(res.data.client);
      }
    );

    getQuery(`/service/${data?.idService?.toString()}`).then(
      (res: AxiosResponse) => {
        //on set les services
        setServiceData(res.data);
      }
    );
  }, []);

  //Permet de faire afficher la description si le client en a une.
  let description;
  data &&
    data.description &&
    (description = (
      <View style={styles.iconContainer}>
        <Entypo
          name="typing"
          size={20}
          color="#023535"
          style={{ marginRight: 5 }}
        />
        <Text style={[styles.description]}>{data.description}</Text>
      </View>
    ));
  //Permet de faire afficher l'heure si c'est une prestation à l'heure.
  let hours;
  data &&
    data.nbHours &&
    (hours = (
      <View style={styles.iconContainer}>
        <Ionicons
          name="time-outline"
          size={20}
          color="#008F8C"
          style={{ marginRight: 5 }}
        />
        <Text style={[styles.cityHoursCard]}>{data.nbHours} h</Text>
      </View>
    ));

  return (
    <>
      <View>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Feather
              name="shopping-cart"
              size={20}
              color="#035A5A"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.titleCard}>
              {serviceData && serviceData.name}
            </Text>
          </View>
          <View style={styles.rowCard}>
            <View style={styles.iconContainer}>
              <Feather
                name="map-pin"
                size={20}
                color="#008F8C"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.cityHoursCard}>
                {clientData && clientData.city}{" "}
                {clientData && clientData.postalCode}
              </Text>
            </View>
            {hours}
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={20}
              color="#008F8C"
              style={{ marginRight: 5 }}
            />
            <Text style={[styles.dateCard]}>
              {moment(data.appointmentDate).format("DD/MM/YYYY - h:mm")}
            </Text>
          </View>
          {description}
          <View style={[styles.buttonCard]}>
            <Button
              title="Accepter"
              onPress={() => {
                setModalVisible(true);
                setIdBookingSelected(data.id);
              }}
              color="#035A5A"
            />
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    borderWidth: 2,
    borderColor: "#035A5A",
  },
  iconContainer: {
    flexDirection: "row",
  },
  titleCard: {
    fontSize: 18,
    color: "#035A5A",
    fontWeight: "bold",
    marginBottom: 8,
  },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityHoursCard: {
    color: "#008F8C",
    fontSize: 14,
    marginBottom: 8,
  },
  dateCard: {
    color: "#008F8C",
    fontSize: 14,
    marginBottom: 15,
  },
  description: {
    color: "#023535",
    fontSize: 14,
  },
  buttonCard: {
    marginTop: 30,
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  modalView: {
    marginTop: 60,
    margin: 10,
    paddingTop: "10%",
    paddingBottom: "30%",
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
    color: "white",
    marginTop: "10%",
    marginBottom: "10%",
    paddingTop: 40,
    paddingBottom: 40,
    fontSize: 20,
  },
  btnModal: {
    backgroundColor: "#9FC131",
    padding: 5,
    margin: 20,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    marginBottom: "10%",
  },
  txtBtnModel: {
    fontSize: 20,
    color: "white",
  },
});
export default CardRequestBooking;
