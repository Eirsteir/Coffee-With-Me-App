import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import AuthService from '../api/services/AuthService';

export default class Login extends React.Component {

    state = { 
        email: '',
        password: '',
        errorMessage: null,
    }

    handleLogin() {
      const { email, password } = this.state

      AuthService.logIn(email, password)
        .then((data) => {
          if (data) {
            this.props.navigation.navigate('Home');
          }
          return;
        })
        .catch(err => {
          console.log(err);
          this.setState({ errorMessage: err });
        });
    }

    onClick = () => {

    }

    render(){
    
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Coffee With Me</Text>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Email" 
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({email:text})}/>
                    </View>
                <View style={styles.inputView} >
                    <TextInput  
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password" 
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({password:text})}/>
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogin.bind(this)}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onClick('SignUp')}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <View>
                    <Text>Or connect with</Text>
                </View>
            </View>
        );
    }
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