import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const GuestStack = () => {
    return (
        <Stack.Navigator id="GuestStack">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default GuestStack;
