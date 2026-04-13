import {
    FlatList, Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
    Platform
} from 'react-native';
import {LogLevel, OneSignal} from "react-native-onesignal";
import {useEffect, useState} from "react";
import DatePicker from "react-native-date-picker";

const APP_ID = "afe8394c-d6c6-4185-a3ba-df0f7bb11ee8";
const AUTH_ID = "os_v2_app_v7udstgwyzayli5234hxxmi65dvdbycuxche2avycufko4w4o62aueeh6b5bcszbybqubfgbrzeh3biu6zorfjpequ53gkxjxvinbia";

export default function Lab4() {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todo, setTodo] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(APP_ID);

        OneSignal.Notifications.requestPermission(true);

        OneSignal.login("user");
        OneSignal.User.pushSubscription.optIn();
    }, []);

    const Add = async () => {
        try {
            if (title === "") {
                setError("Будь ласка, введіть назву");
            }
            else if (description === "") {
                setError("Будь ласка, введіть опис");
            }
            else {
                const response = await fetch("https://api.onesignal.com/notifications", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${AUTH_ID}`
                    },
                    body: JSON.stringify({
                        app_id: APP_ID,
                        headings: {en: title},
                        contents: {en: description},
                        included_segments: ["All"],
                        send_after: date.toISOString(),
                    })
                });

                const data = await response.json();
                setTodo([...todo, {title, description, date: date.toLocaleString(), id: data.id}]);
                setTitle("");
                setDescription("");
                setError("");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const Cancel = async (id) => {
        const response = await fetch(`https://api.onesignal.com/notifications/${id}?app_id=${APP_ID}`, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                Authorization: `Basic ${AUTH_ID}`
            }
        });

        const data = await response.json();

        setTodo(todo.filter((el) => el.id !== id))
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />

            <View style={styles.header}>
                <Text style={styles.title}>To-Do Reminder</Text>
                <Text style={styles.subtitle}>Твої завдання під контролем</Text>
            </View>

            {error !== "" && (
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            )}

            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Що потрібно зробити?"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                    placeholder="Додатковий опис"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <Pressable style={styles.input} onPress={() => setOpen(true)}>
                    <Text style={styles.dateText}>🕒 Час: {date.toLocaleString() ?? ""}</Text>
                </Pressable>

                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={Add}>
                    <Text style={styles.buttonText}>Створити</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.list}
                data={todo}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({item}) => {
                    return (
                        <View style={styles.message}>
                            <View style={styles.messageText}>
                                <Text style={styles.messageTitle}>{item.title}</Text>
                                {item.description !== "" && <Text style={styles.messageDesc}>{item.description}</Text>}
                                <View style={styles.dateBadge}>
                                    <Text style={styles.messageDate}>{item.date}</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => Cancel(item.id)} style={styles.imageContainer}>
                                <Image source={require("./img/trash.png")} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />

            <DatePicker
                modal
                date={date}
                open={open}
                confirmText="Підтвердити"
                cancelText="Скасувати"
                title="Оберіть час нагадування"
                onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F9',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingHorizontal: '5%',
        marginTop: Platform.OS === 'ios' ? 60 : 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#111827',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 4,
    },
    errorContainer: {
        width: '90%',
        backgroundColor: '#FEE2E2',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#EF4444',
    },
    error: {
        color: '#B91C1C',
        fontSize: 14,
        fontWeight: '600',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        width: "90%",
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
        minHeight: 52,
        borderRadius: 14,
        paddingHorizontal: 18,
        marginVertical: 8,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    dateText: {
        color: '#4B5563',
        fontSize: 16,
        marginVertical: "auto",
        fontWeight: '500',
    },
    button: {
        width: "90%",
        backgroundColor: '#4F46E5',
        minHeight: 54,
        borderRadius: 14,
        marginVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonText: {
        color: "#FFFFFF",
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    list: {
        width: "100%",
        paddingHorizontal: '5%',
    },
    message: {
        backgroundColor: '#FFFFFF',
        width: "100%",
        borderRadius: 16,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },
    messageText: {
        flex: 1,
        paddingRight: 10,
    },
    messageTitle: {
        fontWeight: '700',
        fontSize: 18,
        color: '#1F2937',
        marginBottom: 4,
    },
    messageDesc: {
        fontSize: 15,
        color: '#6B7280',
        marginBottom: 8,
        lineHeight: 20,
    },
    dateBadge: {
        backgroundColor: '#EEF2FF',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    messageDate: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4F46E5',
    },
    imageContainer: {
        backgroundColor: '#FEF2F2',
        padding: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 22,
        height: 22,
        tintColor: '#EF4444',
    }
});