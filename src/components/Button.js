import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ children, pressed }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={pressed}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    height: 30,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 12,
  },
});

export default Button;
