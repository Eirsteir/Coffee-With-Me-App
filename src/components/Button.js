import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as UiKittenButton } from '@ui-kitten/components';

const Button = ({ onPress, children }) => {
  return (
      <UiKittenButton
        style={styles.button}
        onPress={onPress}>
        {children}
      </UiKittenButton>
  );
};


const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  }
});

export default Button;
