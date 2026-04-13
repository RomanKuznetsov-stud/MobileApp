import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "../contexts/AuthContext";

const api = axios.create({
    baseURL: "https://lab7-project-bcf1c-default-rtdb.europe-west1.firebasedatabase.app/",
    timeout: 10000,
    headers: {"Content-Type": "application/json"},
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
        config.params = {...config.params, auth: token};
    }

    return config;
});

api.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {

    if (error.response) {
        if (error.response.status === 401) {
            const {setLoggedInUser} = useAuth();

            await ReactNativeAsyncStorage.removeItem("token");
            await ReactNativeAsyncStorage.removeItem("userId");
            setLoggedInUser(null);
        }
    }
})

export default api;