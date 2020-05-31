import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import AuthService from '../api/services/AuthService';
import { signIn } from '../App';
import { AuthContext } from '../App';

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, serErrorMessage] = React.useState(null);
    
    const { signIn } = React.useContext(AuthContext);

    const handleLogin = () => {
      console.log(email, password);
      
      signIn({email, password});

    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Coffee With Me</Text>
            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email" 
                    placeholderTextColor="white"
                    onChangeText={email => setEmail(email)}/>
                </View>
            <View style={styles.inputView} >
                <TextInput  
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password" 
                    placeholderTextColor="white"
                    onChangeText={password => setPassword(password)}/>
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={() => signIn({ email, password })}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text onPress={() => navigation.navigate('Signup')}>Sign up</Text>
            </TouchableOpacity>
            <View>
                <Text>Or connect with</Text>
            </View>
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
    logo:{
      fontWeight:"bold",
      fontSize:40,
      color:"#fb5b5a",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#003f5c",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });