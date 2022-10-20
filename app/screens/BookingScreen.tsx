import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { StyleSheet, Text, View } from "react-native";
import axios from "../api/axios";
import { AxiosError, AxiosResponse } from "axios";
import { AxiosFunction } from "../api/AxiosFunction";

export type ICategory = {
  id?: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
};

const BookingScreen = () => {
  const { auth, setAuth } = useAuth();
  const { getQuery } = AxiosFunction();
  const [bookings, setBookings] = useState<ICategory[] | undefined>(undefined);

  useEffect(() => {
    getQuery("/partner/getBooking").then((res: AxiosResponse) => {
      console.log(res.data["services"]);
      setBookings?.(res.data);
    });
  }, []);
  return (
    <View>
      {bookings?.map((booking: ICategory) => {
        return <Text>Pour les services {booking.name}</Text>;
      })}
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
