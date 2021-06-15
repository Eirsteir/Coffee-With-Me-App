import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleService, Text, Layout, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/extra/3rd-party';

import RegisterOrSignupView from './components/RegisterOrSignupView';
import InputField from '../../components/InputField';
import TopNavigation from '../../components/TopNavigation';
import { EmailIcon } from '../../components/extra/icons';
import validate from '../../validation/validation_wrapper';


const RegisterEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const styles = useStyleSheet(themedStyles);

  const onNextButtonPress = () => {
    const emailError = validate('email', email);
    setEmailError(emailError);

    if (emailError)
      return;

      navigation.navigate('RegisterName', { email: email });
  };

  return (
    <React.Fragment>

      <TopNavigation showBackAction/>

    <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text 
                style={styles.header}
                category="s1">
                    Oppgi e-postadressen din
                </Text>
            </View>
            <View style={styles.formContainer}>
                <InputField
                placeholder='E-postadresse'
                accessoryRight={EmailIcon}
                value={email}
                onChangeText={setEmail}
                error={emailError}
                keyboardType='email-address'
                autoCompleteType='email'
                autoCapitalize='none'
                />
            </View>

            <Button
                style={styles.button}
                disabled={!email}
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
    </React.Fragment>
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

export default RegisterEmailScreen;