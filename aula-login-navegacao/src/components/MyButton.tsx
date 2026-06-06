import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// 1. O Contrato do Botão
type MyButtonProps = {
  title: string;
  onPress: () => void;
};

export default function MyButton({ title, onPress }: MyButtonProps) {
  return (
    // activeOpacity={0.7} garante a resposta visual ao clique pedida no desafio
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

// 2. O visual primário do sistema
const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200ea', // Cor primária chamativa
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});