import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as UiKittenButton } from '@ui-kitten/components';

const Button = ({ children, styling, ...props }) => {
  return (
      <UiKittenButton
        style={styles.button, styling}
        size='small'
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
