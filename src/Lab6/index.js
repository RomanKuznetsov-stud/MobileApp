import {StyleSheet} from 'react-native';
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import GuestStack from "./navigation/GuestStack";
import AppStack from "./navigation/AppStack";
import {useEffect} from "react";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const AppContent = () => {
    const {loggedInUser, setLoggedInUser} = useAuth();

    useEffect(() => {
        (async () => {
            const user = await ReactNativeAsyncStorage.getItem("user");
            if (user !== null) {
                setLoggedInUser(JSON.parse(user));
            }
        })();

    }, [])

    return (
        <NavigationContainer>
            {loggedInUser ? <AppStack/> : <GuestStack/>}
        </NavigationContainer>
    )
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
