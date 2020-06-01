import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'

const TextField = props => (
    <View style={styles.inputViewContainer}>
        <View style={styles.inputView}>
        <TextInput style={styles.inputText} {...props} />
        </View>
        {!!props.error && <Text style={styles.errorText}>{props.error}</Text>}
  </View>
)

const styles = StyleSheet.create({
    inputViewContainer: {
        width: '80%',
    },
    inputView: {
        width:"100%",
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
    errorText: {
        marginTop: -15,
        marginBottom: 10,
        color: '#cc0000'
    }
});

export default TextField;