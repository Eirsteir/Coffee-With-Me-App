import React from 'react';
import { View } from 'react-native';
import { Button, CheckBox, Input, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { EmailIcon, EyeIcon, EyeOffIcon, FacebookIcon, GoogleIcon, PersonIcon } from '../components/extra/icons';
import { KeyboardAvoidingView } from '../components/extra/3rd-party';

export default ({ navigation }): React.ReactElement => {

  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('Login');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          category='h1'>
          Break
        </Text>
        <Text 
          style={styles.signUpLabel}
          category="s1">
          Create an account
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          autoCapitalize='none'
          placeholder='Full Name'
          icon={PersonIcon}
          value={name}
          onChangeText={setName}
        />
        <Input
          style={styles.formInput}
          autoCapitalize='none'
          placeholder='Email'
          icon={EmailIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.formInput}
          autoCapitalize='none'
          secureTextEntry={!passwordVisible}
          placeholder='Password'
          icon={passwordVisible ? EyeIcon : EyeOffIcon}
          value={password}
          onChangeText={setPassword}
          onIconPress={onPasswordIconPress}
        />
        <CheckBox
          style={styles.termsCheckBox}
          text='I read and agree to Terms & Conditions'
          checked={termsAccepted}
          onChange={(checked: boolean) => setTermsAccepted(checked)}
        />
      </View>
      <Button
        style={styles.signUpButton}
        size='small'
        onPress={onSignUpButtonPress}>
        SIGN UP
      </Button>
      <View style={styles.socialAuthContainer}>
        <Text
          style={styles.socialAuthHintText}>
          Or Register Using Social Media
        </Text>
        <View style={styles.socialAuthButtonsContainer}>
          <Button
            appearance='ghost'
            size='giant'
            icon={FacebookIcon}
          />
          <Button
            appearance='ghost'
            size='giant'
            icon={GoogleIcon}
          />
        </View>
      </View>
      <Button
        style={styles.signInButton}
        appearance='ghost'
        onPress={onSignInButtonPress}>
        Already have account? Sign In
      </Button>
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
    minHeight: 176,
  },
  signUpLabel: {
    marginTop: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});