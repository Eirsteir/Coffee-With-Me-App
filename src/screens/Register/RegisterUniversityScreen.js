import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleService, Text, Layout, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/extra/3rd-party';

import RegisterOrSignupView from './components/RegisterOrSignupView';
import InputField from '../../components/InputField';
import { PersonIcon } from '../../components/extra/icons';


const RegisterUniversityScreen = ({ route, navigation }) => {
  const [university, setUniversity] = useState();
  const [campus, setCampus] = useState();
  const styles = useStyleSheet(themedStyles);

    const onNextButtonPress = () => {
        if (university)
            navigation.navigate('RegisterUsername', { university, ...route.params });
    };

  return (
    <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text 
                style={styles.header}
                category="h5">
                    Legg til studiested
                </Text>
                <Text 
                    appearance='hint' 
                    category='c2'
                    style={styles.subHeader}
                >
                    Legg til ditt studiested, slik at venner vet hvor de kan finne deg
                </Text>
            </View>
            <View style={styles.formContainer}>
                <InputField
                    autoCapitalize='words'
                    placeholder='Universitet'
                    accessoryRight={PersonIcon}
                    value={university}
                    onChangeText={setUniversity}
                />
                {university && (
                    <InputField
                        autoCapitalize='words'
                        placeholder='Universitet'
                        accessoryRight={PersonIcon}
                        value={university}
                        onChangeText={setUniversity}
                    />
                )}
            </View>

            <Button
                style={styles.button}
                disabled={!university}
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

export default RegisterUniversityScreen;