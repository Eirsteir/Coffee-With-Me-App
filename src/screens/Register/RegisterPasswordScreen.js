import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleService, Icon, Text, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/extra/3rd-party';

import RegisterOrSignupView from './components/RegisterOrSignupView';
import InputField from '../../components/InputField';
import validate from '../../validation/validation_wrapper';


const RegisterPasswordScreen = ({ route, navigation }) => {
    const { email, name } = route.params;
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordError, setPasswordError] =  useState();
    
  const styles = useStyleSheet(themedStyles);

  const onNextButtonPress = () => {
    const passwordError = validate('password', password);
    setPasswordError(passwordError);

    if (passwordError)
      return;

      navigation.navigate('RegisterUniversity', { email, name, password });
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderEyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={!passwordVisible ? 'eye' : 'eye-off'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text 
                style={styles.header}
                category="h5">
                    Opprett et trygt passord
                </Text>
            </View>
            <View style={styles.formContainer}>
                <InputField
                    secureTextEntry={!passwordVisible}
                    placeholder='Passord'
                    accessoryRight={renderEyeIcon}
                    value={password}
                    onChangeText={setPassword}
                    error={passwordError}
                    autoCompleteType='password'
                    autoCapitalize='none'
                />
            </View>

            <Button
                style={styles.button}
                disabled={password.length < 6}
                onPress={onNextButtonPress}>
                Neste
            </Button>
        </SafeAreaView>

        <RegisterOrSignupView 
            questionText='Har du allerede en konto?'
            actionText='Logg inn.'
            onPress={() => navigation.navigate("SignIn")}
        />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  header: {
    marginTop: 40,
    marginBottom: 10
  },
  formContainer: {
    paddingHorizontal: 32,
  },
  button: {
    marginHorizontal: 32,
    marginTop: 20
  },
});

export default RegisterPasswordScreen;