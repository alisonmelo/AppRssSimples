import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// Importando nossos componentes customizados!
import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';

export default function LoginScreen() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  
  const router = useRouter();

  const handleLogin = () => {
    if (nome === 'admin' && senha === '123') {
      router.push({ pathname: '/HomeScreen', params: { usuario: nome } });
    } else {
      Alert.alert('Erro', 'Credenciais inválidas!');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
        style={styles.logo} 
      />
      <Text style={styles.titulo}>Login Modular</Text>

      {/* Olha como o código fica limpo e sem poluição visual! */}
      <MyInput
        placeholder="Digite seu usuário"
        value={nome}
        onChangeText={setNome}
      />

      <MyInput
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        isPassword={true} // Aqui ativamos a censura da senha!
      />

      <MyButton 
        title="ENTRAR" 
        onPress={handleLogin} 
      />
    </View>
  );
}

// O StyleSheet principal agora só cuida do alinhamento do container e textos base
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: { width: 80, height: 80, marginBottom: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
});