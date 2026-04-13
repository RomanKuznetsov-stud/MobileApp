import {createStackNavigator} from "@react-navigation/native/src/__stubs__/createStackNavigator";
import HomeScreen from "../screens/HomeScreen";
import AccountInfoScreen from "../screens/AccountInfoScreen";
import UpdateAccountScreen from "../screens/UpdateAccountScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator id="AppStack">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AccountInfo" component={AccountInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AppStack;