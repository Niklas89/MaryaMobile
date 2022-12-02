import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { AxiosFunction } from "../api/AxiosFunction";
import CardBooking from "../components/CardBooking";
import colors from "../config/colors";
import { IBooking } from "../interfaces/IBooking";

type Booking = {
  id?: number;
  accepted: boolean;
  appointmentDate: string;
  description: string;
  nbHours: number;
  totalPrice: number;
  idService: number;
  idClient: number;
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
};

const PlanningScreen = () => {
  const [valueSelected, setValueSelected] = useState<string>("ongoing");
  const [pastData, setPastData] = useState<Array<Booking>>();
  const [currentDayData, setCurrentDayData] = useState<Array<Booking>>();
  const [futureData, setFutureData] = useState<Array<Booking>>();

  const URL = "partner/booking/";

  // ajouter le get des infos personnelles
  const { getQuery } = AxiosFunction();

  const getData = (dataType: string) => {
    getQuery(URL + dataType).then((response: AxiosResponse) => {
      dataType === "future" &&
        response.data &&
        setFutureData(response.data.partner.bookings);
      dataType === "past" &&
        response.data &&
        setPastData(response.data.partner.bookings);
      dataType === "present" &&
        response.data &&
        setCurrentDayData(response.data.partner.bookings);
    });
  };

  useEffect(() => {
    getData("present");
    getData("future");
    getData("past");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.periodContainer}>
        <Button
          title="En cours"
          color={valueSelected === "ongoing" ? colors.primary : colors.grey}
          onPress={() => {
            setValueSelected("ongoing");
          }}
        />
        <Button
          title="Terminées"
          color={valueSelected === "finished" ? colors.primary : colors.grey}
          onPress={() => {
            setValueSelected("finished");
          }}
        />
      </View>
      <>
        {valueSelected === "ongoing" && (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.planningContainer}>
              <Text style={styles.planningText}>Aujourd'hui</Text>
              {currentDayData ? (
                currentDayData.map((booking: Booking, index: number) => {
                  return (
                    <View key={index}>
                      <CardBooking booking={booking} />
                    </View>
                  );
                })
              ) : (
                <Text style={{ color: colors.text, textAlign: "center" }}>
                  Pas de prestations pour aujourd'hui.
                </Text>
              )}
            </View>
            <View style={styles.planningContainer}>
              <Text style={styles.planningText}>A venir</Text>
              {futureData ? (
                futureData.map((booking: Booking, index: number) => {
                  return (
                    <View key={index}>
                      <CardBooking booking={booking} />
                    </View>
                  );
                })
              ) : (
                <Text style={{ color: colors.text, textAlign: "center" }}>
                  Pas de prestations à venir.
                </Text>
              )}
            </View>
          </ScrollView>
        )}
        {valueSelected === "finished" && (
          <View style={styles.planningContainer}>
            <Text style={styles.planningText}>Passés</Text>
            {pastData ? (
              pastData.map((booking: Booking, index: number) => {
                return (
                  <View key={index}>
                    <CardBooking booking={booking} />
                  </View>
                );
              })
            ) : (
              <Text style={{ color: colors.text, textAlign: "center" }}>
                Pas de prestations passées.
              </Text>
            )}
          </View>
        )}
      </>
    </View>
  );
};

export default PlanningScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 60,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    width: "100%",
  },
  periodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  periodText: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.white,
    backgroundColor: colors.grey,
  },
  planningContainer: {
    marginTop: 15,
    width: "100%",
  },
  planningText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    color: colors.text,
    fontWeight: "bold",
  },
});
