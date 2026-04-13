import {authentication} from "../firebase/config";
import {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useAuth} from "../contexts/AuthContext";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const {setLoggedInUser} = useAuth();

    const SignIn = async () => {
        try {
            setDisabled(true);
            const res = await signInWithEmailAndPassword(authentication, email, password)
            await ReactNativeAsyncStorage.setItem("user", JSON.stringify(res.user))
            setLoggedInUser(res.user);
        }
        catch {
            setError("Неправильний Email або Пароль");
        }
        finally {
            setDisabled(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>З поверненням!</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput value={email} placeholder="Email" onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address"/>
                <TextInput value={password} placeholder="Пароль" onChangeText={setPassword} style={styles.input} secureTextEntry={true}/>

                <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.replace("ResetPassword")}>
                    <Text style={styles.forgotText}>Забули пароль?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={SignIn} disabled={disabled}>
                    <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Немає облікового запису?</Text>
                    <TouchableOpacity onPress={() => navigation.replace("Register")}>
                        <Text style={styles.registerText}> Зареєструватись</Text>
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
        fontSize: 28,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
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

export default LoginScreen;