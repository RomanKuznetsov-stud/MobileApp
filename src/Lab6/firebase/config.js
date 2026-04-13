import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDu0piZSgCgKZMw195k9rUxWnJ6zegd5po",
    authDomain: "authentication-app-cd7e3.firebaseapp.com",
    projectId: "authentication-app-cd7e3",
    storageBucket: "authentication-app-cd7e3.firebasestorage.app",
    messagingSenderId: "194986427372",
    appId: "1:194986427372:web:79b081e4f9e78994def6c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const authentication = getAuth(app);

export { authentication, db };