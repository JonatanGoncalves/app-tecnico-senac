import { Surface, Text } from "react-native-paper";
import { styles } from "../../config/styles";
import { View } from "react-native";

export default function HomeScreen() {
    return (
        <Surface style={styles.container}>
            <View style={styles.container_inner}>
                <Text>Bem-Vindo A Tela de HomeScreen</Text>
            </View>
        </Surface>
    )
}