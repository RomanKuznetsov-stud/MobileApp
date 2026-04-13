import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Реєстрація</Text>

            <TextInput style={styles.input} placeholder="Електронна пошта" />
            <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />
            <TextInput style={styles.input} placeholder="Пароль (ще раз)" secureTextEntry />
            <TextInput style={styles.input} placeholder="Прізвище" />
            <TextInput style={styles.input} placeholder="Ім’я" />

            <Button title="Зареєструватися" color="#007bff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 45,
    },
});
