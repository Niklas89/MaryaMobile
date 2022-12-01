import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AxiosFunction } from "../api/AxiosFunction";
import { IUser } from "../interfaces/Iclient";
import { IService } from "../interfaces/IService";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { RefreshControl, SafeAreaView } from "react-native";
import routes from "../navigation/routes";
import { DevSettings } from "react-native";

interface ICardRequestBooking {
  appointmentDate: string | undefined;
  description: string | undefined;
  nbHours: number | undefined;
  idClient: number | string | undefined;
  idService: number | string | undefined;
  idBooking: any;
}

const CardRequestBooking = (data: ICardRequestBooking, { navigate }: any) => {
  const { getQuery, patchQuery } = AxiosFunction();
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<IService>();
  const [clientData, setClientData] = useState<IUser>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userInfo, setUserInfos] = useState<IUser>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
  const dataDescription = data.description;
  let description;
  if (dataDescription) {
    description = (
      <Text style={[styles.description]}>
        <Entypo name="typing" size={20} color="#023535" />
        {" " + data.description}
      </Text>
    );
  }
  //Permet de faire afficher l'heure si c'est une prestation à l'heure.
  const dataHours = data.nbHours;
  let hours;
  if (dataHours) {
    hours = (
      <Text style={[styles.cityHoursCard]}>
        <Ionicons name="time-outline" size={20} color="#008F8C" />
        {data.nbHours} h
      </Text>
    );
  }
  const refresh = (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  function acceptBooking(idBooking: number) {
    patchQuery(`booking/${idBooking?.toString()}`, {})
      .then((response: AxiosResponse) => {
        //Si l'enregistrement ce fait alors on dirige vers le planning
        setModalVisible(false);
        refresh;
      })
      .catch((error: AxiosError) => {
        setError(true);
      });
  }

  return data && clientData && serviceData ? (
    <>
      <View style={modalVisible && { backgroundColor: "black", opacity: 0.5 }}>
        <View style={[styles.card]}>
          <Text style={[styles.titleCard]}>
            <Feather name="shopping-cart" size={20} color="#035A5A" />
            {" " + serviceData.name}
          </Text>
          <View style={[styles.rowCard]}>
            <Text style={[styles.cityHoursCard]}>
              <Feather name="map-pin" size={20} color="#008F8C" />
              {" " + clientData.city + " - " + clientData.postalCode}
            </Text>
            {hours}
          </View>
          <Text style={[styles.dateCard]}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={20}
              color="#008F8C"
            />
            {" " + moment(data.appointmentDate).format("DD/MM/YYYY - h:mm")}
          </Text>
          {description}
          <View style={[styles.buttonCard]}>
            <Button
              title="Accepter"
              onPress={() => setModalVisible(true)}
              color="#035A5A"
            />
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closePressable}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="md-close-sharp" size={24} color="white" />
            </Pressable>
            <Text style={styles.textModal}>
              {"Accepter " +
                serviceData.name +
                " à " +
                clientData.city +
                " " +
                clientData.postalCode +
                ", le " +
                moment(data.appointmentDate).format("DD/MM/YYYY à h:mm")}
            </Text>
            <View>
              <Pressable
                style={styles.btnModal}
                onPress={() => acceptBooking(data.idBooking)}
              >
                <Text style={[styles.txtBtnModel]}>
                  Oui, j'accepte {data.idBooking}
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  ) : (
    <Text>Une erreur est survenue.</Text>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: "#035A5A",
  },
  titleCard: {
    fontSize: 23,
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
    fontSize: 17,
    marginBottom: 8,
  },
  dateCard: {
    //color: "#9FC131",
    color: "#008F8C",
    fontSize: 17,
    marginBottom: 15,
  },
  description: {
    color: "#023535",
    fontSize: 17,
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
    backgroundColor: "#035A5A",
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
