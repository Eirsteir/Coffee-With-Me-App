import React from 'react';
import { View } from 'react-native';
import { Button, Input, Layout, StyleService, Text, Divider, useStyleSheet } from '@ui-kitten/components';
import { EyeIcon, EyeOffIcon, PersonIcon, FacebookIcon, GoogleIcon } from '../components/extra/icons';
import { KeyboardAvoidingView } from '../components/extra/3rd-party';

export default ({ navigation }): React.ReactElement => {

  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('Register');
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
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
      </View>
      <Layout
        style={styles.formContainer}
        level='1'>
        <Input
          placeholder='Email'
          icon={PersonIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          placeholder='Password'
          icon={passwordVisible ? EyeIcon : EyeOffIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          onIconPress={onPasswordIconPress}
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance='ghost'
            status='primary'
            onPress={onForgotPasswordButtonPress}>
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Button
        style={styles.signInButton}
        size='small'>
        SIGN IN
      </Button>
      <View style={styles.orContainer}>
        <Divider style={styles.divider}/>
        <Text
          style={styles.orLabel}
          category='h5'>
          OR
        </Text>
        <Divider style={styles.divider}/>
      </View>
      <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}>
            Sign in with a social account
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              icon={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              icon={FacebookIcon}
            />
          </View>
        </View>
      <Button
        style={styles.signUpButton}
        appearance='ghost'
        status='basic'
        onPress={onSignUpButtonPress}>
        Don't have an account? Sign up.
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 52,
  },
  divider: {
    flex: 1,
  },
  orLabel: {
    marginHorizontal: 8,
  },
  socialAuthContainer: {
    marginTop: 48,
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