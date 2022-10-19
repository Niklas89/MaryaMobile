import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from "../screens/BookingScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import PlanningScreen from "../screens/PlanningScreen";

export type RouteParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Booking: undefined;
  Profile: undefined;
  Planning: undefined;
  BotMenu: any;
  screen: any;
  Activité?: undefined;
  Demande?: undefined;
};

const Tab = createBottomTabNavigator<RouteParams>();

function BotMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#DBF227",
        tabBarStyle: { backgroundColor: "#008F8C" },
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Demande"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={25} color="#FFFFFF" />
          ),
        }}
      />
      <Tab.Screen
        name="Activité"
        component={PlanningScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={25} color="#FFFFFF" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={25} color="#FFFFFF" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RouteParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};
