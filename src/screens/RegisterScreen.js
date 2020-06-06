import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Logo from '../components/Logo';
import TextField from '../components/TextField';
import { SuccessSnackbar, ErrorSnackbar } from '../components/Snackbar';
import { AuthContext } from '../App';
import validate from '../validation/validation_wrapper';


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [successSnackbarIsVisible, setSuccessSnackbarIsVisible] = useState(false);
  const [errorSnackbarIsVisible, setErrorSnackbarIsVisible] = useState(false);
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
      setErrorSnackbarIsVisible(true);
    })
  }
  
  return (
    <View style={styles.container}>
      <SuccessSnackbar 
        visible={successSnackbarIsVisible} 
        textMessage="Successfully registered account" 
        actionHandler={() => { navigation.navigate("Login")}} 
        actionText="Login"/>
      <ErrorSnackbar 
        visible={errorSnackbarIsVisible} 	
        textMessage="Unable to register account. Try again later" 
        actionHandler={() => { setErrorSnackbarIsVisible(false) }} 
        actionText="Dismiss"/>

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

      <TouchableOpacity style={styles.signupBtn} onPress={() => handleRegister({ email, name, password })}>
        <Text style={styles.signupText}>Sign up</Text>
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