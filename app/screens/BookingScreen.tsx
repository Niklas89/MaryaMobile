import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { StyleSheet, Text, View } from "react-native";
import { AxiosResponse } from "axios";
import { AxiosFunction } from "../api/AxiosFunction";
import { IBooking, IBookings } from "../interfaces/IBooking";
import { IService } from "../interfaces/IService";

const BookingScreen = () => {
  const { getQuery } = AxiosFunction();
  const [services, setServices] = useState<IService[]>();
  const [bookings, setBookings] = useState<IBooking[]>();

  useEffect(() => {
    getQuery("/partner/getBooking").then((res: AxiosResponse) => {
      //console.log(res.data?.[0].services?.[0].bookings);
      setServices?.(res.data?.[0].services);
      setBookings?.(res.data?.[0].services?.[0].bookings);
    });
  }, []);

  function getServices() {
    services?.forEach((service: IService, index: any) => {
      //ici récupéré les données
    });
  }
  console.log(getServices());
  return (
    <View>
      {bookings?.map((booking: IBooking) => {
        return <Text>Pour les services {booking.totalPrice}</Text>;
      })}
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
