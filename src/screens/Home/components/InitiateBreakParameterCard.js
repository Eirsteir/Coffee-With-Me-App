import React from 'react';
import { View } from 'react-native';
import {
  Card,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';

export const InitiateBreakParameterCard = (props) => {

  const styles = useStyleSheet(themedStyles);

  const { hint, value, ...restProps } = props;
    const Icon = props.icon;

  return (
    <Card {...restProps}>
      <View style={styles.topContainer}>
        <Text appearance='hint'>
          {hint}
        </Text>
        <Icon style={styles.icon} />
      </View>
      <Text
        style={styles.valueLabel}
        category='h5'>
        {value}
      </Text>
    </Card>
  );
};

const themedStyles = StyleService.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueLabel: {
    marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'color-primary-default',
  },
});