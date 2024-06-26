import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { CombinedDarkTheme, CombinedLightTheme, NavigationDarkTheme, NavigationLightTheme } from "../config/theme";
import { useTheme } from "../contexts/ThemeContext";
import { Provider } from "react-native-paper";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegistroScreen/RegistroScreen";
import Home from "../screens/HomeScreen/screens/Home"
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import Detail from "../screens/HomeScreen/screens/Detail";
import PhotoPostScreen from "../screens/PhotoPostScreen/PhotoPostScreen";
import FeedScreen from "../screens/FeedScreen/FeedScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;
    const themeNavigation = isDarkTheme ? NavigationDarkTheme : NavigationLightTheme;

    return (
        <Provider theme={theme}>
            <NavigationContainer theme={themeNavigation}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{ title: "Registro de usuário" }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Detail"
                        component={Detail}
                    />
                    <Stack.Screen
                        name="SettingsScreen"
                        component={SettingsScreen}
                        options={{ title: "Configurações" }}
                    />
                    <Stack.Screen
                        name="PhotoPostScreen"
                        component={PhotoPostScreen}
                        options={{ title: "Nova Postagem" }}
                    />
                    <Stack.Screen
                        name="FeedScreen"
                        component={FeedScreen}
                        options={{ title: "Seu feed" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
