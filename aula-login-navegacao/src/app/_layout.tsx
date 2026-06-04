import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* index é a tela inicial (Login). Vamos esconder o cabeçalho */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* home é a tela principal após o login */}
      <Stack.Screen name="HomeScreen" options={{ title: 'Página Inicial' }} />
    </Stack>
  );
}