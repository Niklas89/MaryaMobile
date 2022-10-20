import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from "../screens/BookingScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import PlanningScreen from "../screens/PlanningScreen";
import ProfileAddressScreen from "../screens/ProfileAddressScreen";
import ProfileCategoryScreen from "../screens/ProfileCategoryScreen";
import ProfilePersoInfoScreen from "../screens/ProfilePersoInfoScreen";
import ProfileBankDetailsScreen from "../screens/ProfileBankDetailsScreen";
import colors from "../config/colors";

export type RouteParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Booking: undefined;
  Profile: undefined;
  ProfileNavigator: undefined;
  Planning: undefined;
  BotMenu: any;
  screen: any;
  Address: undefined;
  Category: undefined;
  PersoInfos: undefined;
  BankDetails: undefined;
};

const Tab = createBottomTabNavigator<RouteParams>();

function BotMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#DBF227",
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarStyle: {
          backgroundColor: "#008F8C",
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={25} color="#FFFFFF" />
          ),
          tabBarLabel: "Demandes",
          title: "Demandes",
        }}
      />
      <Tab.Screen
        name="Planning"
        component={PlanningScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={25} color="#FFFFFF" />
          ),
          tabBarLabel: "Activité",
          title: "Activité",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={25} color="#FFFFFF" />
          ),
          tabBarLabel: "Profil",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RouteParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BotMenu"
        component={BotMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Address"
        component={ProfileAddressScreen}
        options={{ title: "Adresse" }}
      />
      <Stack.Screen
        name="Category"
        component={ProfileCategoryScreen}
        options={{ title: "Catégorie" }}
      />
      <Stack.Screen
        name="PersoInfos"
        component={ProfilePersoInfoScreen}
        options={{ title: "Informations personnelles" }}
      />
      <Stack.Screen
        name="BankDetails"
        component={ProfileBankDetailsScreen}
        options={{ title: "Informations bancaires" }}
      />
    </Stack.Navigator>
  );
};
