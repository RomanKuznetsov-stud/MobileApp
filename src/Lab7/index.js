import {AuthProvider, useAuth} from "./contexts/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import GuestStack from "./navigation/GuestStack";
import {useEffect} from "react";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import AppStack from "./navigation/AppStack";

const AppContent = () => {
    const {loggedInUser, setLoggedInUser} = useAuth();

    useEffect(() => {
        (async () => {
            const id = await ReactNativeAsyncStorage.getItem("userId");
            if (id !== null) {
                setLoggedInUser(id);
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
