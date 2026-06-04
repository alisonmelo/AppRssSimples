import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  
  // Pegando o parâmetro que foi passado na tela de Login (Com tipagem TypeScript!)
  const { usuario } = useLocalSearchParams<{ usuario: string }>();

  // Se o usuário não digitar nada, mostramos "Visitante"
  const nomeUsuario = usuario || 'Visitante';

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Olá, {nomeUsuario}! 👋</Text>
      
      <TouchableOpacity 
        style={styles.botaoVoltar} 
        onPress={() => router.back()} // Volta para a tela anterior
      >
        <Text style={styles.textoBotao}>Sair (Voltar)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f7fa' },
  texto: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  botaoVoltar: { padding: 15, backgroundColor: '#d32f2f', borderRadius: 8 },
  textoBotao: { color: '#fff', fontWeight: 'bold' }
});