import React from 'react';
import { View, TextInput, Text } from 'react-native';

const FormField = (props) => {
  const { label } = props;

  return (
    <View
      style={{
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'left',
      }}
    >
      <Text>
        {label}
      </Text>
      <TextInput
        style={{
          color: '#364047',
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
        }}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
};

export default FormField;
