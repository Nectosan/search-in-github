import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, Text, View,TextInput,Button } from 'react-native';


export default function App() {

  const fetchUser = async (username) => {
    const response = await fetch(`http://localhost:4242/api/users/${username}`);
    const data = await response.json();

    setUser(data.data.body)
  }

  const [text, setText] = useState({});
  const [user, setUser] = useState({});

  function getElements(){
      const text = []
      for (const key in user){
        text.push(
          <Text style={styles.text} key={key}>{key} : {user[key]}</Text>
        )
      }
      return text
  }

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          onChangeText={text => setText(text)}
      />

    <Button title="Récupérer les informations" onPress={ async ()=>{
    
    fetchUser(text)
    }} 
    
    /><View style={styles.textcontainer}>
      {getElements()}</View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF2F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  textcontainer: {
    
    marginTop:10,
    alignItems: 'stretch',
    justifyContent: 'center',

  },

  text:{
    height: 40,
    paddingTop:10,
    borderWidth: 1,
    borderColor: "#6D758B",
    backgroundColor:"#E5EBF7"
  }

});
