import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookingScreen from "../screens/BookingScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import PlanningScreen from "../screens/PlanningScreen";
import ProfileNavigator from "./ProfileNavigator";
import { RouteParams } from "./RootNavigator";

const Tab = createBottomTabNavigator<RouteParams>();

const TabNavigator = () => {
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
        tabBarInactiveTintColor: "#ffffff",
      }}
    >
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={25} color={color} />
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
            <Ionicons name="calendar" size={25} color={color} />
          ),
          tabBarLabel: "Activité",
          title: "Activité",
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={25} color={color} />
          ),
          tabBarLabel: "Profil",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
