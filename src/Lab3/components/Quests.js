import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
const QUEST_LIST = [
    { id: '1', title: "Tap 10 times", desc: "Tap on the clicker object 10 times", target: 10, keyName: "clicks" },
    { id: '2', title: "Double-tap 5 times", desc: "Double-tap on the clicker object 5 times", target: 5, keyName: "doubleClicks" },
    { id: '3', title: "Long press img seconds", desc: "Hold the clicker object img seconds", target: true, keyName: "longPress" },
    { id: '4', title: "Drag the object", desc: "Drag the clicker object around the screen", target: true, keyName: "pan" },
    { id: '5', title: "Swipe right", desc: "Perform a quick swipe right gesture", target: true, keyName: "rightFling" },
    { id: '6', title: "Swipe left", desc: "Perform a quick swipe left gesture", target: true, keyName: "leftFling" },
    { id: '7', title: "Pinch to resize", desc: "Use pinch gesture to resize the clicker object", target: true, keyName: "pinch" },
    { id: '8', title: "Reach 100 points", desc: "Reach 100 points in any way", target: 100, keyName: "points" },
];

const Quests = ({ quests }) => {

    const renderItem = ({ item }) => {
        const currentValue = quests[item.keyName];
        const isBooleanTarget = item.target === true;

        const isCompleted = isBooleanTarget
            ? currentValue === true
            : currentValue >= item.target;

        const progressPercentage = isBooleanTarget
            ? 0
            : Math.min(Math.floor((currentValue / item.target) * 100), 100);

        return (
            <View style={styles.card}>
                <View style={styles.textSection}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc}>{item.desc}</Text>

                    {!isBooleanTarget && (
                        <View style={styles.progressContainer}>
                            <View style={styles.track}>
                                <View style={[styles.bar, { width: `${progressPercentage}%` }]} />
                            </View>
                            <Text style={styles.progressText}>
                                {Math.min(item.target, currentValue)}/{item.target}
                            </Text>
                        </View>
                    )}
                </View>

                {isCompleted ? (
                    <View style={styles.doneCircle}>
                        <Text style={styles.checkMark}>✓</Text>
                    </View>
                ) : (
                    <View style={styles.pendingCircle} />
                )}
            </View>
        );
    };

    return (
        <FlatList
            data={QUEST_LIST}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: "#cc98f6",
        borderRadius: 10,
        flexDirection: "row",
        padding: 15,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    textSection: {
        flex: 1,
        paddingRight: 10,
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardDesc: {
        fontSize: 16,
        fontStyle: "italic",
        marginBottom: 5,
    },
    track: {
        width: "80%",
        height: 6,
        backgroundColor: "#ffffff",
        borderRadius: 10,
    },
    bar: {
        height: "100%",
        backgroundColor: "#699e44",
        borderRadius: 10,
    },
    progressText: {
        fontSize: 14,
        fontWeight: "500",
    },
    pendingCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: "#333",
        borderWidth: 2,
    },
    doneCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#50bc1f",
        alignItems: "center",
        justifyContent: "center",
    },
    checkMark: {
        color: "white",
        fontWeight: "bold",
    }
});

export default Quests;