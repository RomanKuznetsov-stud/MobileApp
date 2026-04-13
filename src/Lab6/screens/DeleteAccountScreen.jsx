import {authentication, db} from "../firebase/config";
import {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {deleteUser, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {useAuth} from "../contexts/AuthContext";
import {doc, deleteDoc} from "firebase/firestore";

const DeleteAccountScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const user = authentication.currentUser;
    const {setLoggedInUser} = useAuth();

    const Delete = async () => {
        if (email === "" || password === "") {
            setError("Заповніть всі поля");
        }
        else {
            const credential = EmailAuthProvider.credential(email, password);

            try {
                setDisabled(true);
                await reauthenticateWithCredential(user, credential);
                const userRef = doc(db, "users", user.uid);
                await deleteDoc(userRef);

                await deleteUser(user);

                setLoggedInUser(null);
            }
            catch (e) {
                Alert.alert("Помилка", e.message);
            }
            finally {
                setDisabled(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Видалення акаунта</Text>
                <Text style={styles.subtitle}>Цю дію неможливо скасувати.</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput value={email} placeholder="Email" onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address"/>
                <TextInput value={password} placeholder="Пароль" onChangeText={setPassword} style={styles.input} secureTextEntry={true}/>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={Delete} disabled={disabled}>
                    <Text style={styles.buttonText}>Назавжди видалити</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Передумали?</Text>
                    <TouchableOpacity onPress={() => navigation.replace("Home")}>
                        <Text style={styles.registerText}> Відмінити</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    formContainer: {
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
        textAlign: 'center',
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
    button: {
        width: '100%',
        backgroundColor: '#EF4444',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: "#EF4444",
        marginBottom: 15,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: '#6B7280',
        fontSize: 15,
    },
    registerText: {
        color: '#2563EB',
        fontSize: 15,
        fontWeight: '600',
    }
});

export default DeleteAccountScreen;