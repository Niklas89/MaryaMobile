import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { AxiosResponse } from "axios";
import { AxiosFunction } from "../api/AxiosFunction";
import { IBooking } from "../interfaces/IBooking";
import { IService } from "../interfaces/IService";
import { ICategory } from "../interfaces/ICategory";
import CardRequestBooking from "../components/CardRequestBooking";

import { ScrollView } from "react-native-gesture-handler";
import ModalBooking from "../components/ModalBooking";
import useAuth from "../hooks/useAuth";
import colors from "../config/colors";

const BookingScreen = () => {
  const { getQuery } = AxiosFunction();
  const [services, setServices] = useState<IService[]>();
  const [categories, setCategories] = useState<ICategory[]>();
  const [bookings, setBookings] = useState<IBooking[]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bookingAccepted, setBookingAccepted] = useState<number>(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [idBookingSelected, setIdBookingSelected] = useState<number>();

  const { userDataChange } = useAuth();

  useEffect(() => {
    getQuery("/partner/getBooking").then((res: AxiosResponse) => {
      res.data && setCategories(res.data);
    });
  }, [bookingAccepted, userDataChange]);

  useEffect(() => {
    getServices();
  }, [categories]);

  /**
   * fonction qui permet de faire les foreach sur les catégories puis services pour avoir les different bookings
   */
  const getServices = () => {
    let bookings: IBooking[] = [];
    let services: IService[] = [];

    categories?.forEach((category: ICategory) => {
      category.services?.forEach((service: IService) => {
        //on push les services
        services.push(service);
        service.bookings?.forEach((booking: IBooking) => {
          //on push les bookings
          bookings.push(booking);
        });
      });
    });
    //on trie les booking avec la fonction sortBoohingDates
    bookings.sort(sortBookingDates);

    setBookings(bookings);
    setServices(services);
  };

  /**
   * Fonction qui permet de trier les dates dans appointementDate
   * @param a on donne une date d'appointementDate
   * @param b on donne une date d'appointementDate
   * @returns on retourne la valeur la plus petite
   */
  const sortBookingDates = (a: IBooking, b: IBooking) => {
    const key1 = new Date(a?.appointmentDate ? a?.appointmentDate : "now");
    const key2 = new Date(b?.appointmentDate ? b?.appointmentDate : "now");
    if (key1 < key2) {
      return -1;
    } else if (key1 == key2) {
      return 0;
    } else {
      return 1;
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getQuery("/partner/getBooking").then((res: AxiosResponse) => {
        setCategories(res.data);
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={[
        styles.scroll,
        modalVisible && { backgroundColor: "black", opacity: 0.5 },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {bookings &&
          bookings.map((booking: IBooking) => {
            return (
              <View key={booking.id}>
                <CardRequestBooking
                  data={booking}
                  setModalVisible={setModalVisible}
                  setIdBookingSelected={setIdBookingSelected}
                />
              </View>
            );
          })}
        {bookings?.length === 0 && (
          <Text style={styles.noBookingText}>Pas de demandes en attente.</Text>
        )}
      </View>
      {idBookingSelected && (
        <ModalBooking
          bookingAccepted={bookingAccepted}
          setBookingAccepted={setBookingAccepted}
          id={idBookingSelected}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      )}
    </ScrollView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  noBookingText: {
    color: colors.text,
    fontSize: 16,
    textAlign: "center",
    marginTop: 25,
  },
});
