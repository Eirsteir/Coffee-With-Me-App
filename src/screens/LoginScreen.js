import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component'

import Logo from '../components/Logo';
import { AuthContext } from '../App';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorSnackBarIsVisible, setErrorSnackBarIsVisible] = useState(false);

    const { login } = React.useContext(AuthContext);

    const handleLogin = ({ email, password }) => {
      login({ email, password }, navigation).catch((err) => {
        console.log("ERROR: ");
        console.log(err);
        if (err.response.status == 401) {
          setErrorMessage('Wrong email or password');
          return;
        }
        setErrorSnackBarIsVisible(true);
      })
    }

    return (
        <View style={styles.container}>
          <SnackBar visible={errorSnackBarIsVisible} backgroundColor='#cc0000' accentColor='#f5f5f5'	textMessage="Unable to log in. Please try again later" actionHandler={() => { setErrorSnackBarIsVisible(false) }} actionText="Dismiss"/>

            <Logo />

            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email" 
                    onChangeText={email => setEmail(email)}/>
                </View>
            <View style={styles.inputView} >
                <TextInput  
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password" 
                    onChangeText={password => setPassword(password)}/>
            </View>

            {!!errorMessage &&  <Text style={styles.errorText}>{errorMessage}</Text>}

            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin({ email, password })}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
              <View style={styles.hrLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.hrLine} />
            </View>
            <View style={styles.socialContainer}>
              <SocialIcon
                title='Sign In With Facebook'
                button
                type='facebook'
                fontWeight='300'
                style={styles.social}
              />
              <SocialIcon
                title='Sign In With Google'
                button
                type='google'
                fontWeight='300'
                style={styles.social}
              />
            </View>
            <TouchableOpacity style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <Text style={styles.signupText} onPress={() => navigation.navigate('Register')}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
    
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
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
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:5,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    },
    orContainer: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    hrLine: {
      width: '44%',
      backgroundColor: '#d3d3d3',
      height: 1,
    },
    dividerText: {
      color: 'black',
      textAlign: 'center',
      width: width / 10,
    },
    signupContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
    signupText: {
      color: '#0091e1'
    },
    socialContainer: {
      width: '60%',
      marginTop: 40
    },
    social: {
      borderRadius:5,
      height: 50,
      alignItems:"center",
      justifyContent:"center",    
    },
    errorText: {
        marginTop: -15,
        marginBottom: 10,
        color: '#cc0000'
    }
});
