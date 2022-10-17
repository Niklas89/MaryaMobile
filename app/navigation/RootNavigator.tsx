import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../screens/Index";
import LoginScreen from "../screens/LoginScreen";

export type RouteParams = {
    Index: undefined;
    LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<RouteParams>();

export const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="Index" component={Index} />
            </Stack.Group>
        </Stack.Navigator>
    );
};
