import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const news = Array.from({ length: 7 }, (_, i) => ({
    id: i.toString(),
    title: 'Заголовок новини',
    date: 'Дата новини',
    summary: 'Короткий текст новини',
}));

export default function HomeScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.newsItem}>
            <Image source={require('../img/7dufch.jpg')} style={styles.image} />
            <View style={styles.textBlock}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.date}</Text>
                <Text style={styles.subtitle}>{item.summary}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Новини</Text>
            <FlatList data={news} renderItem={renderItem} keyExtractor={item => item.id} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' },
    newsItem: { flexDirection: 'row', marginBottom: 10 },
    image: { width: 70, height: 70, marginRight: 10 },
    textBlock: { flex: 1 },
    title: { fontWeight: 'bold' },
    subtitle: { color: 'gray' },
});
