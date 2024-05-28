import { Button, Icon, Surface, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { styles } from "../../config/styles";
import { View } from "react-native";
import { useState } from "react";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    async function handleLogin (){
        try{
            const user = signInWithEmailAndPassword(auth ,email, senha)
            if (user) {
                console.log("Usuário Logado com sucesso!");
                navigation.navigate("HomeScreen");
            }
        }catch(e){
            console.error(e);
        }
    }

    return (
    <Surface style={styles.container}>
      <View style={styles.container_inner}>
        <Icon source="account" size={100} />
        <Text>Tela de Login</Text>
        <Text>{"\n"}</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          style={styles.input}
        />
        <TextInput
          label="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry={hidePassword}
          right={
            <Icon
              name={hidePassword ? "eye" : "eye-off"}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Text>{"\n"}</Text>
        <Button mode="contained" onPress={handleLogin}>Logar</Button>
        <Text>{"\n"}</Text>
        <Button onPress={() => navigation.navigate("RegisterScreen")}>
          Fazer cadastro
        </Button>
      </View>
    </Surface>
  );
}
