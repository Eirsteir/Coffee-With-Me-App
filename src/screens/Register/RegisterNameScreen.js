import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleService, Text, Layout, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/extra/3rd-party';

import RegisterOrSignupView from './components/RegisterOrSignupView';
import InputField from '../../components/InputField';
import { PersonIcon } from '../../components/extra/icons';


const RegisterNameScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState();
  const styles = useStyleSheet(themedStyles);

  const onNextButtonPress = () => {
    if (name)
        return navigation.navigate('RegisterPassword', { email, name });

    setNameError("Du må skrive inn et ordentlig navn");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text 
                style={styles.header}
                category="h5">
                    Legg til navnet ditt
                </Text>
                <Text 
                    appearance='hint' 
                    category='c2'
                >
                    Legg til navnet ditt, slik at venner kan finne deg
                </Text>
            </View>
            <View style={styles.formContainer}>
                <InputField
                    autoCapitalize='words'
                    placeholder='Fullt navn'
                    accessoryRight={PersonIcon}
                    value={name}
                    error={nameError}
                    onChangeText={setName}
                />
            </View>

            <Button
                style={styles.button}
                disabled={!name}
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

export default RegisterNameScreen;