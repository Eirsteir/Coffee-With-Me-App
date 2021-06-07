import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

export const ProfileSocial = (props) => {

  const { style, hint, value, ...viewProps } = props;

  return (
    <View
      {...viewProps}
      style={[styles.container, style]}>
      <Text
        category='s2'>
        {value}
      </Text>
      <Text
        category='c2'>
        {props.hint}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});