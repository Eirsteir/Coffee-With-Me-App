import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


const Logo = () => {
    return (
    <View style={styles.logoContainer}>
        <Text style={styles.logo}>COFFEE WITH</Text>
        <Text style={styles.logo}>ME</Text>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:40
    },
    logo:{
      fontSize: 30,
      color:"#fb5b5a",
    }
});

export default Logo;