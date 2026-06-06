import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { api } from "@/services/api";

type PokemonListItem = {
  name: string;
  url: string;
};

export default function HomeScreen(){
  const[pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const[loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(()=>{
  async function carregarPokemons(){
    try{
      const response = await api.get('pokemon?limit=50');
      setPokemons(response.data.results)
    }catch (error){
      console.log('erro na api', error);
    }finally{
      setLoading(false);
    }
  }
  carregarPokemons();
},[] );

if(loading){
  return(
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#e3350d"/>
      <Text> Buscando Pokémons </Text>
    </View>
  )
}
const renderItem = ({item}: {item: PokemonListItem}) =>(
  <TouchableOpacity
  style={styles.card}
  onPress={()=> router.push({pathname:'/detalhes', params:{nome: item.name}})}
  >
    <Text style={styles.nome}>{item.name.toUpperCase()}</Text>
  </TouchableOpacity>
)

return (
  <View style={styles.container}>
    <FlatList
      data={pokemons}
      keyExtractor={(item)=>item.name}
      renderItem={renderItem}
    />
  </View>
)

}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: '#ebebeb', padding:10},
  center: {flex:1, justifyContent: 'center', alignItems: 'center'},
  card: {backgroundColor:'#fff', padding:20, borderRadius:8, elevation:2},
  nome:{fontSize: 10, fontWeight: 'bold', color:'#333'}
})
