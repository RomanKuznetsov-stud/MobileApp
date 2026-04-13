import {StyleSheet, TextInput, TouchableOpacity, View, Text} from "react-native";
import {useState} from "react";
import api from "../api/api";
import {useAuth} from "../contexts/AuthContext";

const CreatePostScreen = ({navigation}) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const {loggedInUser} = useAuth();

    const createPost = async () => {
        setError("");

        if (title === "" || text === "") {
            setError("Заповніть всі поля!");
        }
        else {
            setDisabled(true);
            try {
                await api.post(`/users/${loggedInUser}/posts.json`, {
                    title: title,
                    text: text,
                });
                navigation.navigate("Posts");
            }
            catch (error) {
                setError("Сталась помилка, спробуйте ще раз");
            }
            finally {
                setDisabled(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            {error !== "" && <Text style={styles.error}>{error}</Text>}
            <View style={styles.textContainer}>
                <TextInput style={styles.input} value={title} onChangeText={(value) => setTitle(value)} placeholder="Тема" />
                <TextInput keyboardType="numeric" style={styles.input} value={text} onChangeText={(value) => setText(value)} placeholder="Текст" />
                <View style={styles.containerRow}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Posts")} activeOpacity={0.8}><Text style={styles.buttonText}>Назад</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={createPost} activeOpacity={0.8} disabled={disabled}><Text style={styles.buttonText}>Створити</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRow: {
        flexDirection: 'row',
        marginTop: 10
    },
    textContainer: {
        backgroundColor: '#a1a0a0',
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
        width: "80%"
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    button: {
        width: '45%',
        backgroundColor: '#1893cf',
        padding: 10,
        borderRadius: 12,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: "red",
        marginBottom: 10,
        fontSize: 18,
    },
});

export default CreatePostScreen;