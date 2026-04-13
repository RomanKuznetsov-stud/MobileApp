import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {authentication, db} from "../firebase/config";
import {useAuth} from "../contexts/AuthContext";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {setDoc, doc} from "firebase/firestore"

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const {setLoggedInUser} = useAuth();

    const Register = async () => {
        setError("");

        if (password !== confirmPassword) {
            setError("Паролі не співпадають!");
        }
        else if (password.length < 6) {
            setError("Пароль повинен бути не менше 6 символів");
        }
        else {
            setDisabled(true);

            try {
                const res = await createUserWithEmailAndPassword(authentication, email, password);
                const docRef = doc(db, "users", res.user.uid)
                await setDoc(docRef, {
                    uid: res.user.uid,
                    name: "",
                    age: 0,
                    city: "",
                }, {merge: false});

                await ReactNativeAsyncStorage.setItem("user", JSON.stringify(res.user))
                setLoggedInUser(res.user);
            }
            catch (error) {
                setError(error.message);
                console.error("Помилка реєстрації:", error);
            }
            finally {
                setDisabled(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Створити акаунт</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput value={email} placeholder="Email" onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address"/>
                <TextInput value={password} placeholder="Пароль" onChangeText={setPassword} style={styles.input} secureTextEntry={true}/>
                <TextInput value={confirmPassword} placeholder="Підтвердіть пароль" onChangeText={setConfirmPassword} style={styles.input} secureTextEntry={true}/>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={Register} disabled={disabled}>
                    <Text style={styles.buttonText}>Зареєструватись</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Вже маєте акаунт?</Text>
                    <TouchableOpacity onPress={() => navigation.replace("Login")}>
                        <Text style={styles.registerText}> Увійти</Text>
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
        fontSize: 26,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 25,
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
        backgroundColor: '#2563EB',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
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

export default RegisterScreen;