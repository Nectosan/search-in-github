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
         <><View style={styles.bloccontainer}>
            <Text style={styles.titretext} key={key}>{key}</Text>
            <Text style={styles.text} key={key}>{user[key]}</Text> 
           </View></>
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
    backgroundColor: '#F9FFFE',
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
    textAlign: 'center',    
    justifyContent: 'center',
  },

  titretext:{
    fontWeight: "bold",
    fontSize:19,
    color:"#1C1D1F"
  },

  bloccontainer:{
    height: 60,
    marginBottom:10,
    paddingTop:5,
    borderRadius:50,
    borderColor: "#6D758B",
    backgroundColor:"#D8F5F5"
  },

  text:{
    color:"#686B70"
  }

});
