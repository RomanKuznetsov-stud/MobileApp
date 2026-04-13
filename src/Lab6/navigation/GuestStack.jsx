import {createStackNavigator} from "@react-navigation/native/src/__stubs__/createStackNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createStackNavigator();

const GuestStack = () => {
    return (
        <Stack.Navigator id="GuestStack">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default GuestStack;
