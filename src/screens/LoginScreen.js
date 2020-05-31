import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Logo from '../components/Logo';
import { AuthContext } from '../App';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, serErrorMessage] = React.useState(null);
    
    const { login } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>

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

            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={() => login({ email, password })}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
                <Text >
                  <p style={{
                    width: '100%', 
                    textAlign: 'center', 
                    borderBottom: 'solid',
                    borderWidth: 1,
                    borderColor: '#d2d2d2',
                    lineHeight: '0.1em',
                    margin: '10px 0 20px'}}
                    ><span style={{
                      background:'#fff', padding:'0 10px', 
                      }}
                    >OR</span></p>
                </Text>
            </View>
            <TouchableOpacity>
                <Text onPress={() => navigation.navigate('Register')}>Don't have an account? Sign up</Text>
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
      marginTop: 30
    },
});
