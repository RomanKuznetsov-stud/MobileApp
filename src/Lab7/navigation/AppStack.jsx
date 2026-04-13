import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PostsScreen from "../screens/PostsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import UpdatePostScreen from "../screens/UpdatePostScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator id="AppStack">
            <Stack.Screen name="Posts" component={PostsScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="UpdatePost" component={UpdatePostScreen} options={{ headerShown: false }}  />
        </Stack.Navigator>
    )
}

export default AppStack;
