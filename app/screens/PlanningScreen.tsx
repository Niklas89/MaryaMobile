import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { AxiosFunction } from "../api/AxiosFunction";
import CardBooking from "../components/CardBooking";
import colors from "../config/colors";
import { IBooking } from "../interfaces/IBooking";

const PlanningScreen = () => {
  const [valueSelected, setValueSelected] = useState<string>("ongoing");
  const [pastData, setPastData] = useState<Array<IBooking>>();
  const [currentDayData, setCurrentDayData] = useState<Array<IBooking>>();
  const [futureData, setFutureData] = useState<Array<IBooking>>();

  const URL = "partner/booking/";

  // ajouter le get des infos personnelles
  const { getQuery } = AxiosFunction();

  const getData = (dataType: string) => {
    getQuery(URL + dataType).then((response: AxiosResponse) => {
      dataType === "future" && setFutureData(response.data.partner.bookings);
      dataType === "past" && setPastData(response.data.partner.bookings);
      dataType === "present" && setCurrentDayData(response.data.partner.bookings);
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
              {currentDayData &&
                currentDayData.map((booking: IBooking) => {
                  return <CardBooking data={booking} />;
                })}
            </View>
            <View style={styles.planningContainer}>
              <Text style={styles.planningText}>A venir</Text>
              {futureData &&
                futureData.map((booking: IBooking) => {
                  return <CardBooking data={booking} />;
                })}
            </View>
          </ScrollView>
        )}
        {valueSelected === "finished" && (
          <View style={styles.planningContainer}>
            <Text style={styles.planningText}>Passés</Text>
            {pastData &&
              pastData.map((booking: IBooking) => {
                return <CardBooking data={booking} />;
              })}
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
