import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { signOut } from "firebase/auth";
import {authentication} from "../firebase/config";
import {useAuth} from "../contexts/AuthContext";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
    const {setLoggedInUser} = useAuth();

    const SignOut = async () => {
        await signOut(authentication);
        await ReactNativeAsyncStorage.removeItem("user");
        setLoggedInUser(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Головне меню</Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.replace("AccountInfo")}>
                <Text style={styles.buttonText}>Мій акаунт</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.dangerButton]} activeOpacity={0.8} onPress={() => Alert.alert(
                "Видалити акаунт",
                "Ви впевнені, що хочете видалити акаунт?",
                [
                    { text: "Ні", style: "cancel" },
                    { text: "Так", onPress: () => navigation.replace("DeleteAccount"), style: "destructive" }
                ]
            )}>
                <Text style={styles.dangerButtonText}>Видалити акаунт</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.outlineButton]} activeOpacity={0.8} onPress={SignOut}>
                <Text style={styles.outlineButtonText}>Вийти</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 40,
    },
    button: {
        width: '100%',
        backgroundColor: '#2563EB',
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dangerButton: {
        backgroundColor: '#FEE2E2',
        shadowOpacity: 0,
        elevation: 0,
    },
    dangerButtonText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: 'bold',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#D1D5DB',
        shadowOpacity: 0,
        elevation: 0,
        marginTop: 10,
    },
    outlineButtonText: {
        color: '#4B5563',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default HomeScreen;