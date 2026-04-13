import {useEffect, useState} from "react";
import api from "../api/api";
import {useAuth} from "../contexts/AuthContext";
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const PostsScreen = ({navigation}) => {
    const [posts, setPosts] = useState(null);

    const {loggedInUser, setLoggedInUser} = useAuth();

    const updatePosts = async () => {
        try {
            const response = await api.get(`/users/${loggedInUser}/posts.json`);
            const arr = Object.entries(response.data ?? {}).map(([key, value]) => ({
                id: key,
                ...value
            }));

            setPosts(arr);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (id) => {
        try {
            await api.delete(`/users/${loggedInUser}/posts/${id}.json`);
            setPosts(posts.filter((post) => post.id !== id));
        }
        catch (error) {
            console.log(error);
        }
    }

    const logOut = async () => {
        await ReactNativeAsyncStorage.removeItem("token");
        await ReactNativeAsyncStorage.removeItem("userId");
        setLoggedInUser(null);
    }

    useEffect(() => {
        (async () => await updatePosts())();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={logOut}>
                    <Text style={styles.buttonText}>Вийти</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate("CreatePost")}>
                    <Text style={styles.buttonText}>Створити пост</Text>
                </TouchableOpacity>
            </View>
            {posts === null && <View style={{flex: 1}}><Text>Завантаження...</Text></View>}
            {posts !== null && <FlatList style={styles.list} data={posts} renderItem={({item}) => (
                <View style={styles.post} key={item.id}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.text}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("UpdatePost", {
                            post: {
                                id: item.id,
                                title: item.title,
                                text: item.text,
                            }
                        })} style={[styles.postButton, styles.update]}>
                            <Text style={styles.postButtonText}>Редагувати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={async () => await deletePost(item.id)} style={[styles.postButton, styles.delete]}>
                            <Text style={styles.postButtonText}>Видалити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}/>}
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
    list: {
        width: '100%',
    },
    post: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        width: '90%',
        marginHorizontal: "auto",
        padding: 10,
        backgroundColor: '#cccaca',
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#2563EB',
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 55,
        marginBottom: 15,
        width: '45%',
        alignItems: 'center',
        marginHorizontal: 5
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    postButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
        width: '40%',
        marginHorizontal: "auto",
        marginTop: 5
    },
    delete: {
        backgroundColor: 'red',
    },
    update: {
        backgroundColor: '#a952c6',
    },
    postButtonText: {
        fontSize: 16,
        color: 'white',
        textAlign: "center"
    },
    row: {
        flexDirection: 'row',
    }
});

export default PostsScreen;