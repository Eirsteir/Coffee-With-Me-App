import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SnackBar from 'react-native-snackbar-component'

import Logo from '../components/Logo';
import TextField from '../components/TextField';
import { AuthContext } from '../App';
import validate from '../helpers/validation_wrapper';


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [successSnackbarIsVisible, setSuccessSnackbarIsVisible] = useState(false);
  const [unsuccessfulSnackbarIsVisible, setUnsuccessfulSnackbarIsVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const { register } = React.useContext(AuthContext);


  const handleRegister = ({ email, name, password }) => {

    const emailError = validate('email', email);
    const nameError = validate('name', name);
    const passwordError = validate('password', password);

    setEmailError(emailError);
    setNameError(nameError);
    setPasswordError(passwordError);

    if (emailError || nameError || passwordError) {
      return;
    }

    register({ email, name, password }).then(data => {
      setSuccessSnackbarIsVisible(true);
    }).catch(err => {    
      console.log(err); 
      setUnsuccessfulSnackbarIsVisible(true);
    })
  }
  
  return (
    <View style={styles.container}>
      <SnackBar visible={successSnackbarIsVisible} backgroundColor='#4BCA81' accentColor='#f5f5f5' textMessage="Successfully registered account" actionHandler={() => { navigation.navigate("Login")}} actionText="Login"/>
      <SnackBar visible={unsuccessfulSnackbarIsVisible} backgroundColor='#cc0000' accentColor='#f5f5f5'	textMessage="Unable to register account. Try again later" actionHandler={() => { setUnsuccessfulSnackbarIsVisible(false) }} actionText="Dismiss"/>

      <Logo />

      <Text style={styles.title}>Create an account</Text>

      <TextField
        placeholder='Email'
        onChangeText={email => setEmail(email.trim())}
        onBlur={() => setEmailError(validate('email', email))}
        autoCompleteType='email'
        autoCapitalize='none'
        error={emailError}
      />
      <TextField
        placeholder='Name'
        onChangeText={name => setName(name.trim())}
        onBlur={() => setNameError(validate('name', name))}
        autoCapitalize='words'
        error={nameError}
      />
      <TextField
        placeholder='Password'
        onChangeText={password => setPassword(password.trim())}
        onBlur={() => setPasswordError(validate('password', password))}
        secureTextEntry
        error={passwordError}
      />

      <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.signupText} onPress={() => handleRegister({ email, name, password })}>Sign up</Text>
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