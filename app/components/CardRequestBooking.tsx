import { AxiosResponse } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { AxiosFunction } from "../api/AxiosFunction";
import { IUser } from "../interfaces/Iclient";
import { IService } from "../interfaces/IService";

interface ICardRequestBooking {
  //serviceName: string | undefined;
  appointmentDate: string | undefined;
  //city: string | undefined;
  description: string | undefined;
  nbHours: number | undefined;
  idClient: number | string | undefined;
  idService: number | string | undefined;
}

const CardRequestBooking = (data: ICardRequestBooking) => {
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
        setServiceData(res.data);
      }
    );
  }, []);
  return data && clientData && serviceData ? (
    <>
      <Text>id service {data.idService}</Text>
      <Text>id client {data.idClient}</Text>
      <Text>Service: {serviceData.name}</Text>
      <Text>Date: {moment(data.appointmentDate).format("DD/MM/YYYY")}</Text>
      <Text>Ville: {clientData.city}</Text>
      <Text>Commentaire:{data.description}</Text>
      <Text>Nombre d'heure:{data.nbHours}</Text>
      <Button
        title="Accepter"
        //onPress={() => navigation.navigate(routes.REGISTER)}
        color="#0FC2C0"
      />
    </>
  ) : (
    <Text>Une erreur est survenue.</Text>
  );
};

export default CardRequestBooking;
