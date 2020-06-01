import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import SnackBar from 'react-native-snackbar-component'

import Logo from '../components/Logo';
import { AuthContext } from '../App';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [successSnackbarIsVisible, setSuccessSnackbarIsVisible] = useState(false);
  const [unsuccessfulSnackbarIsVisible, setUnsuccessfulSnackbarIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register } = React.useContext(AuthContext);


  const handleRegister = ({ email, name, password }) => {
    register({ email, name, password }).then(data => {
      setSuccessSnackbarIsVisible(true);
    }).catch(err => {
      console.log(err);
      
      setErrorMessage(err);
      setUnsuccessfulSnackbarIsVisible(true);
    })
  }

  const inputViewStyles = () => {
    console.log('input view styles')

    if (errorMessage == null) {
      return styles.inputView;
    }
    console.log('error input view styles')
    return [styles.errorStyles, styles.inputView];
  }
  
  return (
    <View style={styles.container}>
      <SnackBar visible={successSnackbarIsVisible} backgroundColor='#4BCA81' accentColor='#f5f5f5' textMessage="Successfully registered account" actionHandler={() => { navigation.navigate("Login")}} actionText="Login"/>
      <SnackBar visible={unsuccessfulSnackbarIsVisible} backgroundColor='#cc0000' accentColor='#f5f5f5'	textMessage="Unable to register account. Try again later" actionHandler={() => { setUnsuccessfulSnackbarIsVisible(false) }} actionText="Dismiss"/>

      <Logo />

      <Text style={styles.title}>Create an account</Text>
      <View style={inputViewStyles()} >
        <TextInput
          style={styles.inputText}
          placeholder='Email'
          onChangeText={email => setEmail(email)}
          autoCapitalize='none'
        />
        {error && <Text>{error.email}</Text>}
      </View>
      <View style={inputViewStyles()} >
        <TextInput
          style={styles.inputText}
          placeholder='Name'
          onChangeText={name => setName(name)}
          autoCapitalize='words'
        />
        {error && <Text>{error.name}</Text>}
      </View>
      <View style={inputViewStyles()} >
        <TextInput
          style={styles.inputText}
          placeholder='Password'
          onChangeText={password => setPassword(password)}
          secureTextEntry
        />
        {error && <Text>{error.password}</Text>}
      </View>
      <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.signupText} onPress={() => handleRegister({ email, name, password })}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}


const genericInputViewStyles = () => {
  return
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
  inputView: {
    width:"80%",
    backgroundColor:"#f5f5f5",
    borderRadius:5,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  errorInputView: {
    borderColor: '#cc0000'
  },
  inputText:{
    height:50,
  },
  inputErrorText: {
    color: '#cc0000'
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