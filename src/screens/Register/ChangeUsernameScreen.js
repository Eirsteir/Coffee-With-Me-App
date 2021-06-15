import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleService, Text, Layout, useStyleSheet, useTheme } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/extra/3rd-party';

import RegisterOrSignupView from './components/RegisterOrSignupView';
import InputField from '../../components/InputField';
import { CheckMarkCircleIcon } from '../../components/Icons';
import { ThemeContext } from '../../theme-context';


const ChangeUsernameScreen = ({ route, navigation }) => {
  const { email, name, password, username } = route.params;
  const [newUsername, setNewUsername] = useState();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme(ThemeContext);

  const onNextButtonPress = () => {
    return navigation.navigate({
        name: 'RegisterUsername', 
        params: { email, name, password, username: getCurrentUsername() },
        merge: true,
    });
  };

  const getCurrentUsername = () => newUsername === undefined ? username : newUsername;
   
    const renderCheckIcon = () => (
        <CheckMarkCircleIcon 
            fill={theme['color-success-default']} 
            height={20}
            width={20} 
        />
    );

  return (
    <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text 
                style={styles.header}
                category="h5">
                    Endre brukernavn
                </Text>
                <Text 
                    appearance='hint' 
                    category='c2'
                    style={styles.subHeader}
                >
                    Velg et brukernavn til kontoen din. 
                    Du kan alltids endre det senere.
                </Text>
            </View>
            <View style={styles.formContainer}>
                <InputField
                    autoCapitalize='words'
                    placeholder='Brukernavn'
                    accessoryRight={renderCheckIcon}
                    value={getCurrentUsername()}
                    onChangeText={setNewUsername}
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
  subHeader:  {
    paddingHorizontal: 32,
  },
  formContainer: {
    paddingHorizontal: 32,
  },
  button: {
    marginHorizontal: 32,
    marginTop: 20
  },
});

export default ChangeUsernameScreen;