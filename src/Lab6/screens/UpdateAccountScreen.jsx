import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase/config";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const UpdateAccountScreen = ({navigation}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const {loggedInUser} = useAuth();

    useEffect(() => {
        (async () => {
            const info = await getDoc(doc(db, "users", loggedInUser.uid));
            setUser(info.data());
        })();
    }, []);

    const Update = async () => {
        if (+user.age >= 0) {
            try {
                await updateDoc(doc(db, "users", user.uid), {
                    age: user.age,
                    name: user.name,
                    city: user.city
                });

                navigation.replace("AccountInfo");
            }
            catch {
                setError("Сталася помилка. Спробуйте знову");
            }
        }
        else {
            setError("Вік повинен бути у правильному форматі");
        }
    }

    return (
        <View style={styles.container}>
            {user !== null && <>
                <View style={styles.card}>
                    <Text style={styles.title}>Редагування</Text>

                    {error !== "" ? <Text style={styles.error}>{error}</Text> : null}

                    <Text style={styles.label}>Ім'я</Text>
                    <TextInput style={styles.input} value={user.name} onChangeText={(value) => setUser({ ...user, name: value })} placeholder="Введіть ім'я" />

                    <Text style={styles.label}>Вік</Text>
                    <TextInput keyboardType="numeric" style={styles.input} value={String(user.age)} onChangeText={(value) => setUser({ ...user, age: value })} placeholder="Введіть вік" />

                    <Text style={styles.label}>Місто</Text>
                    <TextInput style={styles.input} value={user.city} onChangeText={(value) => setUser({ ...user, city: value })} placeholder="Введіть місто" />

                    <View style={styles.containerRow}>
                        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.replace("AccountInfo")} activeOpacity={0.8}>
                            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Відмінити</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={Update} activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Зберегти</Text>
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
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 6,
        fontWeight: '500',
        marginLeft: 4,
    },
    input: {
        width: '100%',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        marginBottom: 15,
        fontSize: 16,
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
    },
    error: {
        color: "#EF4444",
        marginBottom: 15,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default UpdateAccountScreen;