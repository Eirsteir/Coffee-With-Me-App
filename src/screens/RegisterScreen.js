import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Logo from '../components/Logo';
import { AuthContext } from '../App';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { register } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>

      <Logo />

      <Text style={styles.title}>Create an account</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder='Email'
          onChangeText={email => setEmail(email)}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder='Name'
          onChangeText={name => setName(name)}
          autoCapitalize='words'
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder='Password'
          onChangeText={password => setPassword(password)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.signupText} onPress={() => register({ email, name, password })}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      fontSize: 20,
      marginBottom: 20
  },
  inputView:{
    width:"80%",
    backgroundColor:"#f5f5f5",
    borderRadius:5,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
  },
  forgot:{
    fontSize:11
  },
  signupBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  signupText:{
    color:"white"
  }
});