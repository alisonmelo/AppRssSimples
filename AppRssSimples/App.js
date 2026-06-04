import React, { useState } from 'react';
import { 
  SafeAreaView, 
  FlatList, 
  Text, 
  View, 
  StyleSheet, 
  Linking, 
  TouchableOpacity, 
  ActivityIndicator,
  TextInput
} from 'react-native';
import * as rssParser from 'react-native-rss-parser';

export default function App() {
  const [urlInput, setUrlInput] = useState(''); // Guarda a URL que você digita
  const [feed, setFeed] = useState([]);         // Guarda a lista de notícias
  const [loading, setLoading] = useState(false); // Controla o indicador de carregamento
  const [errorMsg, setErrorMsg] = useState(''); // Guarda mensagens de erro, se houver

  // Função que é chamada ao clicar no botão "Carregar Feed"
  const carregarFeed = () => {
    if (!urlInput) {
      setErrorMsg('Por favor, digite ou cole uma URL de RSS.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setFeed([]); // Limpa o feed anterior antes de buscar o novo

    fetch(urlInput)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setFeed(rss.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar o feed:", error);
        setErrorMsg('Não foi possível carregar este feed. Verifique a URL.');
        setLoading(false);
      });
  };

  // Função para renderizar cada notícia na lista
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => Linking.openURL(item.links[0].url)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {item.description ? item.description.replace(/<[^>]+>/g, '') : 'Sem descrição disponível.'}
      </Text>
      <Text style={styles.date}>{item.published}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Leitor RSS Manual</Text>
      </View>

      {/* Área de Input e Botão */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cole a URL do RSS aqui..."
          placeholderTextColor="#999"
          value={urlInput}
          onChangeText={setUrlInput} // Atualiza o estado conforme você digita
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />
        <TouchableOpacity style={styles.button} onPress={carregarFeed}>
          <Text style={styles.buttonText}>Carregar</Text>
        </TouchableOpacity>
      </View>

      {/* Exibe mensagem de erro se algo der errado */}
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {/* Lógica de exibição: Loading ou Lista */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loaderText}>Buscando notícias...</Text>
        </View>
      ) : (
        <FlatList
          data={feed}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            !errorMsg && <Text style={styles.emptyText}>Nenhum feed carregado ainda. Cole um link acima!</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#0066cc',
    padding: 20,
    paddingTop: 50,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '500',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    color: '#666',
  },
  list: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});