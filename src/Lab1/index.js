import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// Змінений імпорт для react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function Lab1({ onBack }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <TouchableOpacity style={styles.topRightButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={20} color="#007bff" />
                <Text style={styles.topRightText}> FirstMobileApp</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Image source={require('./img/Logo.png')} style={styles.logo} />
            </View>

            <View style={styles.tabBarContainer}>
                <NavigationContainer independent={true}>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ color, size }) => {
                                let iconName;
                                if (route.name === 'Головна') {iconName = 'home';}
                                else if (route.name === 'Галерея') {iconName = 'images';}
                                else if (route.name === 'Профіль') {iconName = 'person';}

                                return <Ionicons name={iconName} size={20} color={color} />;
                            },
                            tabBarActiveTintColor: '#007bff',
                            tabBarInactiveTintColor: 'gray',
                            tabBarShowIcon: true,
                            tabBarLabelStyle: { fontSize: 12 },
                            tabBarStyle: {
                                backgroundColor: 'lightgray',
                                height: 65,
                                marginTop: -5,
                            },
                            tabBarIndicatorStyle: {
                                backgroundColor: '#007bff',
                            },
                        })}
                    >
                        <Tab.Screen name="Головна" component={HomeScreen} />
                        <Tab.Screen name="Галерея" component={GalleryScreen} />
                        <Tab.Screen name="Профіль" component={ProfileScreen} />
                    </Tab.Navigator>
                </NavigationContainer>

                {/* Нижній текст */}
                <Text style={styles.bottomCenterText}>Кузнєцов Роман Олександрович, ІПЗ 23-2</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    logo: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
    },
    tabBarContainer: {
        flex: 1,
        backgroundColor: 'lightgray',
        marginTop: -25,
    },
    bottomCenterText: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        fontSize: 16,
        fontStyle:'italic',
        color: '#333',
    },
    topRightButton: {
        position: 'absolute',
        top: 43,
        right: 40,
        zIndex: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topRightText:{
        fontSize: 20,
        color: '#333',
    },
});