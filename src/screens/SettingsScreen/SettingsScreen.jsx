import { Button, Surface, Text } from "react-native-paper";
import { styles } from "../../config/styles";
import { useTheme } from "../../contexts/ThemeContext";


export default function SettingsScreen() {
    const { toggleTheme, isDarkTheme } = useTheme();

    return (
        <Surface
            style={styles.container}
        >
            <Text>
                Configurações Maravilhosas do seu APP
            </Text>
            <Button
                onPress={toggleTheme}
            >Alterar tema</Button>
        </Surface>
    )
}