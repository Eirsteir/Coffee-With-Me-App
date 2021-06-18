import React, { useContext, useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleService, Text, Spinner, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/extra/3rd-party';

import RegisterOrSignupView from './components/RegisterOrSignupView';
import { AuthContext } from '../../App';
import { useMutation } from '@apollo/client';
import SIGNUP_MUTATION from '../../graphql/signup.mutation';


const RegisterUsernameScreen = ({ route, navigation }) => {
  const { email, name, password, username, location } = route.params;
  const styles = useStyleSheet(themedStyles);
  const { login } = useContext(AuthContext);
  const usernameSuggestion = email !== undefined ? email.split('@')[0] : '';

  const [register, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: name, 
      email: email,
      username: username || usernameSuggestion,
      preferredLocationUuid: location && location.uuid,
      password1: password,
      password2: password // workaround
    },
    onCompleted: ({ register }) => handleSignUpCompleted(register),
    onError: err => Alert.alert("Noe gikk galt", err.message)    
  });
  
  const handleSignUpCompleted = (register) => {
    if (register.success) 
      return login({ token: register.token });
    console.log(register)
    // Alert.alert("Noe gikk galt", register.errors);
  };

  const onChangeUsername = () => {
      navigation.navigate("ChangeUsername", { email, name, password, username: username || usernameSuggestion });
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text 
                style={styles.header}
                category="h5">
                    Registrere deg som {usernameSuggestion}?
                </Text>
                <Text 
                    appearance='hint' 
                    category='c2'
                >
                    Du kan alltids endre brukernavnet ditt senere.
                </Text>
            </View>
            <Button
                style={styles.button}
                onPress={register}>
                {loading ? <Spinner size='tiny' status='basic'/> : 'Registrer deg'}
            </Button>
            <Button
                style={styles.button}
                appearance='ghost'
                onPress={onChangeUsername}>
                Endre brukernavn
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

export default RegisterUsernameScreen;