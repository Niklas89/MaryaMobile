import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AxiosResponse } from "axios";
import { AxiosFunction } from "../api/AxiosFunction";
import { IBooking, IBookings } from "../interfaces/IBooking";
import { IService } from "../interfaces/IService";
import { ICategory } from "../interfaces/ICategory";
import CardRequestBooking from "../components/CardRequestBooking";
import { ScrollView } from "react-native-gesture-handler";

const BookingScreen = () => {
  const { getQuery } = AxiosFunction();
  const [services, setServices] = useState<IService[]>();
  const [categories, setCategories] = useState<ICategory[]>();
  const [bookings, setBookings] = useState<IBooking[]>();

  // initialisation de currentService à null
  let currentService: IService | null = null;

  useEffect(() => {
    getQuery("/partner/getBooking").then((res: AxiosResponse) => {
      //on set les catégories
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    //on appel la fonction une fois qu'on as les categories
    getServices();
  }, [categories]);
  /**
   * fonction qui permet de faire les foreach sur les catégories puis services pour avoir les different bookings
   */
  function getServices() {
    let bookings: IBooking[] = [];
    let services: IService[] = [];

    categories?.forEach((category: ICategory, index: any) => {
      category.services?.forEach((service: IService, index: any) => {
        //on push les services
        services.push(service);
        service.bookings?.forEach((booking: IBooking, index: any) => {
          //on push les bookings
          bookings.push(booking);
        });
      });
    });
    //on trie les booking avec la fonction sortBoohingDates
    bookings.sort(sortBookingDates);
    //on set les bookings et services
    setBookings(bookings);
    setServices(services);
  }
  /**
   * Fonction qui permet de trier les dates dans appointementDate
   * @param a on donne une date d'appointementDate
   * @param b on donne une date d'appointementDate
   * @returns on retourne la valeur la plus petite
   */
  function sortBookingDates(a: IBooking, b: IBooking) {
    const key1 = new Date(a?.appointmentDate ? a?.appointmentDate : "now");
    const key2 = new Date(b?.appointmentDate ? b?.appointmentDate : "now");
    if (key1 < key2) {
      return -1;
    } else if (key1 == key2) {
      return 0;
    } else {
      return 1;
    }
  }

  return (
    <ScrollView style={styles.scroll}>
      <View>
        {bookings?.map((booking: IBooking, index: any) => {
          return (
            <View key={booking.id}>
              <CardRequestBooking
                idClient={booking.idClient}
                idService={booking.idService}
                appointmentDate={booking.appointmentDate}
                description={booking.description}
                nbHours={booking.nbHours}
                idBooking={booking.id}
              />
            </View>
          );
        })}
      </View>
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
});
