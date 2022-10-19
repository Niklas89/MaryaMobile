import React from "react";
import { Button, StyleSheet, FlatList, View } from "react-native";
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

const menuItems: MenuItems[] = [
  {
    title: "Informations personnelles",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Register",
  },
  {
    title: "Informations bancaires",
    icon: {
      name: "bank",
      backgroundColor: colors.quaternary,
    },
    targetScreen: "Booking",
  },
  {
    title: "Adresse",
    icon: {
      name: "card-account-mail",
      backgroundColor: colors.quinary,
    },
    targetScreen: "Booking",
  },
  {
    title: "Catégorie de service",
    icon: {
      name: "walk",
      backgroundColor: colors.tertiary,
    },
    targetScreen: "Booking",
  },
];

const ProfileScreen: React.FC<Props<"Profile">> = ({ navigation }) => {
  return (
    <Screen style={styles.screen}>
      <View>
        <ProfileHeader
          title="Niklas E"
          subTitle="niklas.edelstam@gmail.com"
          image={require("../assets/img/niklas.jpg")}
        />
      </View>

      <View style={styles.container}>
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
            ListHeaderComponent={
              <View style={styles.innerContainer}>
                <ErrorMessage title="Veuillez mettre à jour vos informations personnels" />
              </View>
            }
            ListFooterComponent={
              <View style={styles.innerContainer}>
                <View style={styles.footerButtons}>
                  <Button
                    title="Supprimer le compte"
                    onPress={() => navigation.navigate("Booking")}
                    color={colors.tertiary}
                    accessibilityLabel="Supprimer le compte"
                  />
                </View>

                <View style={styles.footerButtons}>
                  <Button
                    title="Déconnecter"
                    onPress={() => navigation.navigate("Booking")}
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
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    /*  alignItems: "center", */
    marginLeft: 15,
    marginRight: 15,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    /* alignItems: "center", */
    marginVertical: 20,
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
});
