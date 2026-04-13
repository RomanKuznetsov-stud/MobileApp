import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
    const [currentLab, setCurrentLab] = useState(null);

    const renderLab = () => {
        try {
            if (currentLab === 1) {
                const Lab1 = require('./src/Lab1').default;
                return <Lab1 onBack={() => setCurrentLab(null)} />;
            }

            if (currentLab === 3) {
                const Lab3 = require('./src/Lab3').default;
                return <Lab3 onBack={() => setCurrentLab(null)} />;
            }

             if (currentLab === 4) {
                const Lab4 = require('./src/Lab4').default;
                return <Lab4 onBack={() => setCurrentLab(null)} />;
            }

            if (currentLab === 6) {
                const Lab6 = require('./src/Lab6').default;
                return <Lab6 onBack={() => setCurrentLab(null)} />;
            }

            if (currentLab === 7) {
                const Lab7 = require('./src/Lab7').default;
                return <Lab7 onBack={() => setCurrentLab(null)} />;
            }


        } catch (error) {

            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}> Помилка у коді цієї роботи!</Text>
                    <Text style={styles.errorMessage}>{error.message}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setCurrentLab(null)}>
                        <Text style={styles.buttonText}>Назад до списку</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    if (currentLab !== null) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#282c34' }}>
                {renderLab()}
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Мої Лабораторні</Text>

            <TouchableOpacity style={styles.button} onPress={() => setCurrentLab(1)}>
                <Text style={styles.buttonText}>Лабораторна робота 1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setCurrentLab(3)}>
                <Text style={styles.buttonText}>Лабораторна робота 3</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setCurrentLab(4)}>
                 <Text style={styles.buttonText}>Лабораторна робота 4</Text>
             </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setCurrentLab(6)}>
                <Text style={styles.buttonText}>Лабораторна робота 6</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setCurrentLab(7)}>
                <Text style={styles.buttonText}>Лабораторна робота 7</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#61dafb',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#282c34',
        fontSize: 18,
        fontWeight: 'bold',
    },

    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff6b6b',
        marginBottom: 10,
        textAlign: 'center',
    },
    errorMessage: {
        color: 'white',
        fontSize: 14,
        marginBottom: 30,
        textAlign: 'center',
    }
});