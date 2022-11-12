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
  Password: undefined;
  ProfileNavigator: undefined;
  Planning: undefined;
  screen: any;
  Address: undefined;
  Category: undefined;
  PersoInfos: undefined;
  BankDetails: undefined;
};

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
    </Stack.Navigator>
  );
};
