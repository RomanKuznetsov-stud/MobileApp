import {useState} from "react";
import {sendPasswordResetEmail} from "firebase/auth";
import {authentication} from "../firebase/config";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const ResetPassword = async () => {
        if (email === "") {
            setError("Введіть Email");
        }
        else {
            setError("");

            try {
                await sendPasswordResetEmail(authentication, email);
                Alert.alert("Лист надіслано", "Перевірте свою пошту для відновлення паролю");
                navigation.replace("Login");
            }
            catch {
                setError("Не вдалося надіслати лист. Перевірте Email");
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Відновлення паролю</Text>
                <Text style={styles.subtitle}>Введіть свій email, і ми надішлемо вам інструкції.</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput value={email} placeholder="Email" onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address"/>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={ResetPassword}>
                    <Text style={styles.buttonText}>Надіслати лист</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.replace("Login")}>
                        <Text style={styles.registerText}>Повернутися до входу</Text>
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
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: '#2563EB',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
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
        marginTop: 25,
        alignItems: 'center',
    },
    registerText: {
        color: '#2563EB',
        fontSize: 15,
        fontWeight: '600',
    }
});

export default ResetPasswordScreen;