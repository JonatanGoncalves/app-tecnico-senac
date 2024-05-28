import { View } from "react-native";
import { Button, Icon, Surface, Text, TextInput } from "react-native-paper";
import { styles } from "../../config/styles";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  async function handleRegister(){
    if (senha !== confirmarSenha) {
        alert("Senhas Não São Iguais.");
        return;
    }
    try{
        const userRef = await createUserWithEmailAndPassword(auth, email, senha);
        if (userRef) {
            console.log("Usuário registrado com sucesso!");
            navigation.navigate("LoginScreen");
        }
    }catch(e){
        console.error(e);
    }
  }
  return (
    <Surface style={styles.container}>
      <View style={styles.container_inner}>
        <Icon source="account-check" size={100} />
        <Text>Tela de Registro</Text>
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
        <TextInput
          label="Confirmar Senha"
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirme sua senha"
          secureTextEntry={hidePassword}
          right={
            <Icon
              name={hidePassword ? "eye" : "eye-off"}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Text>{"\n"}</Text>
        <Button mode="contained" onPress={handleRegister}>Realizar Registro</Button>
        <Text>{"\n"}</Text>
        <Button mode="text" onPress={() => navigation.navigate("LoginScreen")}>
          Voltar para o login
        </Button>
      </View>
    </Surface>
  );
}
