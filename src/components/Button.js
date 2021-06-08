import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as UiKittenButton } from '@ui-kitten/components';

const Button = ({ onPress, children, styling, ...props }) => {
  return (
      <UiKittenButton
        style={styles.button, styling}
        onPress={onPress}
        {...props}
        >
        {children}
      </UiKittenButton>
  );
};


const styles = StyleSheet.create({
  button: {
    // TODO: make slimmer
  }
});

export default Button;
