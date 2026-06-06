import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type MyInputProps = {
    placeholder: string;
    value: string;
    onChangeText:(text:string)=>void;
    isPassword?:boolean;
}

export default function MyInput({placeholder, value, onChangeText, isPassword}: MyInputProps){
    return(
        <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        placeholderTextColor="#999"
        />
    );

}
const styles = StyleSheet.create({
    input:{
        width: '100%',
        height: 50,
        backgroundColor:'#e8e8e8',
        paddingHorizontal: 15,
        borderRadius:12,
        fontSize:16,
    }
});

