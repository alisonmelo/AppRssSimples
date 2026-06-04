import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import MyInput from '../components/MyInput';

export default function LoginScreen() {
  const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

  
  // Instanciando o roteador do Expo
  const router = useRouter();

  const handleLogin = () => {
    // Navegando para o arquivo 'home.tsx' e passando o nome como parâmetro!
    router.push({
      pathname: '/HomeScreen',
      params: { usuario: nome }
    });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
        style={styles.logo} 
      />
      <Text style={styles.titulo}>Bem-vindo!</Text>
<MyInput
placeholder='olá'
value={nome}
onChangeText={setNome}
/>
<MyInput
placeholder='Digite sua senha'
value={senha}
onChangeText={setSenha}
isPassword={true}
/>
      {/* <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
      /> */}



      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  botao: { width: '100%', height: 50, backgroundColor: '#6200ea', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});