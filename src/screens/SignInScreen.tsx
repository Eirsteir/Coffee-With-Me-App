import React from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { useMutation } from '@apollo/client';

import { Button, Input, Layout, Icon, StyleService, Text, Divider, Spinner, useStyleSheet } from '@ui-kitten/components';
import { PersonIcon, FacebookIcon, GoogleIcon } from '../components/extra/icons';
import { KeyboardAvoidingView } from '../components/extra/3rd-party';
import { ErrorModal } from '../components/Modal';
import { AuthContext } from '../App';
import SIGNIN_MUTATION from '../graphql/signin.mutation';


export default ({ navigation }): React.ReactElement => {

  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string>();
  const { login } = React.useContext(AuthContext);
  const styles = useStyleSheet(themedStyles);

  const [signIn, { loading }] = useMutation(SIGNIN_MUTATION, {
      variables: {
        email: email,
        password: password
      },
      onCompleted: ({ tokenAuth }) => handleSignInCompleted(tokenAuth),
      onError: err => Alert.alert(err)
  });
  
  const handleSignInCompleted = (tokenAuth: { success: boolean; token: string; errors: any; }): void => {
      if (tokenAuth.success) 
        return login({token: tokenAuth.token});

      return handleErrors(tokenAuth.errors);
  };

  // TODO: Abstract this
  const handleErrors = (errors: { nonFieldErrors: { message: string; }[]; email: { message: string; }[]; password: { message: string; }[]; }): void => {
    if (errors == null) 
      return;
      
    if (errors.nonFieldErrors) 
      setErrors(errors.nonFieldErrors[0].message);
    if (errors.email)
      setErrors(errors.email[0].message);
    if (errors.password)
      setErrors(errors.password[0].message);
  }

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderEyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={!passwordVisible ? 'eye' : 'eye-off'}/>
    </TouchableWithoutFeedback>
  );
  
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

      {/* TODO: Does not work the second time */}
      {errors && <ErrorModal title={errors} />}

        <Input
          placeholder='Email'
          accessoryRight={PersonIcon}
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCompleteType='email'
          autoCapitalize='none'
        />
        <Input
          style={styles.passwordInput}
          placeholder='Password'
          accessoryRight={renderEyeIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          autoCompleteType='password'
          autoCapitalize='none'
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
        size='small'
        disabled={!email || !password}
        onPress={signIn}>
        {loading ? <Spinner size='tiny' status='basic'/> : 'SIGN IN'}
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
              accessoryRight={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              accessoryRight={FacebookIcon}
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
