import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
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
                    name="Booking"
                    component={BookingScreen}
                    options={{
                        headerRight: () => (
                            <Button
                                onPress={() => alert('This is a button!')}
                                title="login"
                                color="#fff"
                            />
                        ),
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};
