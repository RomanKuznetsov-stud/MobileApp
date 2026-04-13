import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';

export default function GalleryScreen() {
    return (
        <ScrollView contentContainerStyle={styles.grid}>
            {Array.from({ length: 10 }, (_, i) => (
                <View key={i} style={styles.item}>
                    <Image source={require('../img/7dufch.jpg')} style={styles.image} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
    },
    item: {
        width: '45%',
        height: 115,
        margin: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        elevation: 12,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
