import { api } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity,Image } from "react-native";



type PokemonDetails = {
    name: string,
    weight: number,
    sprites: {
        front_default: string;
    }
}

export default function DetalhesScreen() {
    const { nome } = useLocalSearchParams<{ nome: string }>();
    const [detalhes, setDetalhes] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      async function buscarDetalhes(){
        try{
          const response = await api.get(`pokemon/${nome}`);
          setDetalhes(response.data)
        }catch (error){
          console.log('erro na api', error);
        }finally{
          setLoading(false);
        }
      }
      buscarDetalhes();
    },[nome] );
    
    if(loading || !detalhes){
      return(
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e3350d"/>
          <Text> Buscando Detalhes do Pokémons </Text>
        </View>
      )
    }
return(
    <View style={styles.container}>
        <View style={styles.card}>
            <Image
            source={{uri: detalhes.sprites.front_default}}
            style={styles.image}
            />
            <Text style={styles.nome}>{detalhes.name.toUpperCase()}</Text>
            <Text style={styles.texto}>Peso: {detalhes.weight}</Text>

        </View>

    </View>
)

}
const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: '#ebebeb', padding:10},
  center: {flex:1, justifyContent: 'center', alignItems: 'center'},
  card: {backgroundColor:'#fff', padding:20, borderRadius:8, elevation:2, gap: 20},
  nome:{fontSize: 26, fontWeight: 'bold', color:'#333'},
  image:{width:200, height:200 },
  texto:{fontSize:18, color:'#555', marginBottom:20}
})
