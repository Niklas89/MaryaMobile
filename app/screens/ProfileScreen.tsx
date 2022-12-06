import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { AxiosFunction } from "../api/AxiosFunction";
import { AxiosError, AxiosResponse } from "axios";
import { Button, StyleSheet, FlatList, View, Alert } from "react-native";
import { RouteParams } from "../navigation/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import ProfileHeader from "../components/ProfileHeader";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ErrorMessage from "../components/ErrorMessage";
import { IUser } from "../interfaces/IUser";
import routes from "../navigation/routes";
import useAuth from "../hooks/useAuth";
import authStorage from "../auth/storage";

type ScreenNavigationProp<T extends keyof RouteParams> = StackNavigationProp<
  RouteParams,
  T
>;

type ScreenRouteProp<T extends keyof RouteParams> = RouteProp<RouteParams, T>;
type Props<T extends keyof RouteParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

interface MenuItems {
  title: string;
  icon?: {
    name?: string;
    backgroundColor?: string;
  };
  targetScreen?: keyof RouteParams;
}

const GETPROFILE_URL = "/partner/profile/";
const DISABLEPROFILE_URL = "/user/inactivate/";
const LOGOUT_URL = "/logout/";

const menuItems: MenuItems[] = [
  {
    title: "Informations personnelles",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.PERSOINFOS,
  },
  {
    title: "Mot de passe",
    icon: {
      name: "account-key",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.PASSWORD,
  },
  {
    title: "Informations bancaires",
    icon: {
      name: "bank",
      backgroundColor: colors.quaternary,
    },
    targetScreen: routes.BANKDETAILS,
  },
  {
    title: "Adresse",
    icon: {
      name: "card-account-mail",
      backgroundColor: colors.quinary,
    },
    targetScreen: routes.ADDRESS,
  },
  {
    title: "Catégorie de service",
    icon: {
      name: "walk",
      backgroundColor: colors.tertiary,
    },
    targetScreen: routes.CATEGORY,
  },
];

const initialUserInfoValues = {
  firstName: "",
  email: "",
  birthdate: "",
  IBAN: "",
  SIRET: "",
};

const ProfileScreen: React.FC<Props<"Profile">> = ({ navigation }) => {
  const [userInfo, setUserInfos] = useState<IUser>(initialUserInfoValues);
  const { auth, setAuth } = useAuth();
  const { getQuery, patchQuery } = AxiosFunction();
  const [stateLogout, setStateLogout] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>();
  let warningMessage;

  useEffect(() => {
    getQuery(GETPROFILE_URL)
      .then((response: AxiosResponse) => {
        setUserInfos({
          firstName: response.data.firstName,
          email: response.data.email,
          birthdate: response.data.partner.birthdate,
          IBAN: response.data.partner.IBAN,
          SIRET: response.data.partner.SIRET,
        });
      })
      .catch((error: AxiosError) => {
        console.log("AxiosError at getProfile: " + error?.response?.status);
        console.log(auth?.role);
        console.log(auth?.accessToken);
      });
  }, []);

  if (
    userInfo.birthdate === null ||
    userInfo.IBAN === null ||
    userInfo.SIRET === null
  ) {
    warningMessage = (
      <View style={styles.innerContainer}>
        <ErrorMessage title="Veuillez mettre à jour vos informations personnels" />
      </View>
    );
  }

  const disableProfile = () => {
    patchQuery(DISABLEPROFILE_URL, userInfo)
      .then((response: AxiosResponse) => {
        authStorage.removeToken();
        setAuth?.({});
      })
      .catch(() => {
        setError(true);
        setErrorMessage(
          "Votre profil n'a pas pu être supprimé. Veuillez nous contacter."
        );
      });
  };

  const askDisableProfile = () =>
    Alert.alert(
      "Suppression du compte",
      'Cliquez sur "Supprimer" si vous voulez vraiment supprimer votre compte. Vous serez déconnecté.',
      [
        {
          text: "Annuler",
          onPress: () => console.log("Annuler"),
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => disableProfile(),
        },
      ]
    );

  useEffect(() => {
    if (stateLogout) {
      getQuery(LOGOUT_URL)
        .then((response: AxiosResponse) => {
          authStorage.removeToken();
          setAuth?.({});
        })
        .catch(() => {
          setError(true);
          setErrorMessage("La déconnexion a échoué. Veuillez nous contacter.");
        });
    }
  }, [stateLogout]);
  return (
    <Screen style={styles.screen}>
      <View>
        <ProfileHeader
          title={userInfo.firstName}
          subTitle={userInfo.email}
          image={require("../assets/img/logo.png")}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.error}>
          {/* Display this error message if logout failed */}
          {error && <ErrorMessage title={errorMessage} />}
        </View>
        <View style={styles.innerContainer}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem

                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon?.name}
                    backgroundColor={item.icon?.backgroundColor}
                  />
                }
                onPress={() =>
                  item.targetScreen
                    ? navigation.navigate(item.targetScreen)
                    : null
                }
              />
            )}
            ListHeaderComponent={warningMessage}
            ListFooterComponent={
              <View style={styles.innerContainer}>
                <View style={styles.footerButtons}>
                  <Button
                    title="Supprimer le compte"
                    onPress={askDisableProfile}
                    color={colors.tertiary}
                    accessibilityLabel="Supprimer le compte"
                  />
                </View>

                <View style={styles.footerButtons}>
                  <Button
                    title="Déconnecter"
                    onPress={() => setStateLogout(true)}
                    color={colors.secondary}
                    accessibilityLabel="Déconnecter"
                  />
                </View>
              </View>
            }
          />
        </View>
      </View>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  completeProfile: {
    backgroundColor: colors.error,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    marginLeft: 15,
    marginRight: 15,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 10
  },
  footerButtons: {
    marginTop: 15,
  },
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  view: {
    flex: 1,
  },
  error: {
    marginTop: 5,
    width: "80%",
  },
});
