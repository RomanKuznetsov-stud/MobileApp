import React from "react";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Home({ points, setPoints, quests, updateQuests }) {
    const posX = useSharedValue(0);
    const posY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const imgScale = useSharedValue(1);
    const startScale = useSharedValue(1);

    const singleTap = Gesture.Tap().onEnd(() => {
        setPoints("clicks", quests.clicks + 1, points + 1);
    }).runOnJS(true);

    const doubleTap = Gesture.Tap().numberOfTaps(2).maxDelay(100).onEnd(() => {
        setPoints("doubleClicks", quests.doubleClicks + 1, points + 2);
    }).runOnJS(true);

    const holdPress = Gesture.LongPress().onEnd((event, isSuccess) => {
        if (isSuccess) {
            const extraPoints = Math.floor(event.duration / 200);
            const isLongEnough = event.duration >= 3000;
            setPoints("longPress", isLongEnough, points + extraPoints);
        }
    }).runOnJS(true);

    const dragGesture = Gesture.Pan()
        .maxPointers(1)
        .minDistance(3)
        .onBegin(() => {
            startX.value = posX.value;
            startY.value = posY.value;
        })
        .onUpdate((e) => {
            const nextX = startX.value + e.translationX;
            const nextY = startY.value + e.translationY;
            const visibleWidth = 130;
            const visibleHeight = 190;

            const boundX = (SCREEN_WIDTH - visibleWidth) / 2;
            const boundY = (SCREEN_HEIGHT - visibleHeight - 150) / 2;

            posX.value = Math.max(-boundX, Math.min(nextX, boundX));
            posY.value = Math.max(-boundY, Math.min(nextY, boundY));
        })
        .onEnd(() => {
            updateQuests("pan", true);
        })
        .runOnJS(true);

    const swipeRight = Gesture.Fling().direction(Directions.RIGHT).onEnd(() => {
        const bonus = Math.floor(Math.random() * 10) + 1;
        setPoints("rightFling", true, points + bonus);
    }).runOnJS(true);

    const swipeLeft = Gesture.Fling().direction(Directions.LEFT).onEnd(() => {
        const bonus = Math.floor(Math.random() * 10) + 1;
        setPoints("leftFling", true, points + bonus);
    }).runOnJS(true);

    const zoomGesture = Gesture.Pinch()
        .onBegin(() => {
            startScale.value = imgScale.value;
        })
        .onUpdate((e) => {
            imgScale.value = Math.max(0.5, Math.min(startScale.value * e.scale, 3));
        })
        .onEnd(() => {
            setPoints("pinch", true, points + 5);
        })
        .runOnJS(true);

    const movements = Gesture.Race(swipeRight, swipeLeft, dragGesture);
    const combinedGestures = Gesture.Simultaneous(movements, zoomGesture);
    const finalGesture = Gesture.Exclusive(combinedGestures, doubleTap, singleTap, holdPress);

    const animStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: posX.value },
            { translateY: posY.value },
            { scale: imgScale.value }
        ]
    }));

    return (
        <View style={[styles.mainWrapper, styles.whiteBg]}>
            <View style={styles.headerScore}>
                <Text style={styles.scoreText}>Points: {points}</Text>
            </View>
            <GestureDetector gesture={finalGesture}>
                <Animated.View style={[animStyle, styles.mainWrapper]}>
                    <Image source={require("../img/pngwing.com.png")} style={styles.clickerImage} />
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteBg: {
        backgroundColor: "#d3c262",
    },
    headerScore: {
        backgroundColor: "#2e96d3",
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    scoreText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    clickerImage: {
        width: 250,
        height: 250,
    }
});