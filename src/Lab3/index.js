import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "./components/Home";
import Quests from "./components/Quests";

const Tab = createBottomTabNavigator();

const Lab3 = () => {
    const [questData, setQuestData] = useState({
        clicks: 0,
        doubleClicks: 0,
        longPress: false,
        pan: false,
        rightFling: false,
        leftFling: false,
        pinch: false,
        points: 0
    });

    const handleUpdateQuest = (name, value) => {
        setQuestData(prev => ({ ...prev, [name]: value }));
    };

    const handleSetPoints = (name, value, totalPoints) => {
        setQuestData(prev => ({ ...prev, [name]: value, points: totalPoints }));
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen
                        name="Home"
                        children={() => (
                            <Home
                                points={questData.points}
                                setPoints={handleSetPoints}
                                quests={questData}
                                updateQuests={handleUpdateQuest}
                            />
                        )}
                        options={{
                            title: "",
                            tabBarIcon: () => <Image source={require('./img/game.png')} style={{ width: 24, height: 24 }} />
                        }}
                    />
                    <Tab.Screen
                        name="Quests"
                        children={() => <Quests quests={questData} />}
                        options={{
                            title: "",
                            tabBarIcon: () => <Image source={require('./img/quests.png')} style={{ width: 24, height: 24 }} />
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default Lab3;