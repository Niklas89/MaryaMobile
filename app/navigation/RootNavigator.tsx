import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from "../screens/BookingScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type RouteParams = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Booking: undefined;
};

const Stack = createNativeStackNavigator<RouteParams>();

export const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Booking" component={BookingScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};
