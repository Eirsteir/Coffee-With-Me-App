import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const LargeHeading = ({ children, ...viewProps }) => {
  const { style } = viewProps;

  return (
    <View style={[styles.container, style]} {...viewProps}>
      <Text style={styles.header} category='h5'>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default LargeHeading;
