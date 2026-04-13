import {useEffect, useState} from "react";
import {getDoc, doc} from "firebase/firestore"
import {db} from "../firebase/config";
import {useAuth} from "../contexts/AuthContext";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

const AccountInfoScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const {loggedInUser} = useAuth();

    useEffect(() => {
        (async () => {
            const info = await getDoc(doc(db, "users", loggedInUser.uid));
            setUser(info.data());
        })();
    }, []);

    return (
        <View style={styles.container}>
            {user !== null && <>
                <View style={styles.card}>
                    <View style={styles.infoSection}>
                        <Text style={styles.label}>Ім'я:</Text>
                        <Text style={styles.value}>{user.name !== "" ? user.name : "Невідомо"}</Text>

                        <Text style={styles.label}>Вік:</Text>
                        <Text style={styles.value}>{+user.age !== 0 ? user.age : "Невідомо"}</Text>

                        <Text style={styles.label}>Місто:</Text>
                        <Text style={styles.value}>{user.city !== "" ? user.city : "Невідомо"}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.replace("Home")} activeOpacity={0.8}>
                            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Назад</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.replace("UpdateAccount")} activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Редагувати</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    infoSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
        fontWeight: '500',
    },
    value: {
        fontSize: 18,
        color: '#1F2937',
        marginBottom: 15,
        fontWeight: '600',
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    button: {
        flex: 1,
        backgroundColor: '#2563EB',
        paddingVertical: 14,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#E5E7EB',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#374151',
    }
});

export default AccountInfoScreen;