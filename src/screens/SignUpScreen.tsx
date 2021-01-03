import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { gql, useMutation } from '@apollo/client';

import { Button, Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import InputField from '../components/InputField';
import { EmailIcon, FacebookIcon, GoogleIcon, PersonIcon } from '../components/extra/icons';
import { KeyboardAvoidingView } from '../components/extra/3rd-party';
import { AuthContext } from '../App';
import validate from '../validation/validation_wrapper';

const REGISTER = gql`
mutation register(
    $name: String!,
    $email: String!,
    $password1: String!,
    $password2: String!
  ) {
    register(
      name: $name,
      email: $email,
      password1: $password1,
      password2: $password2
    ) {
      success
      errors
      refreshToken
      token
  }
}
`

export default ({ navigation }): React.ReactElement => {

  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [emailError, setEmailError] =  React.useState<string>();
  const [passwordError, setPasswordError] =  React.useState<string>();
  const { login } = React.useContext(AuthContext);

  const onSignUpCompleted = (data): void => {
    if (data.register.success) {
      const token = data.register.token;
      return login({ token });
    }
  
    // TODO: This should be handled better
    const errors = data.register.errors
    if (errors.email) {
      setEmailError(errors.email[0].message);
    } else if (errors.password) {
      setPasswordError(errors.password[0].message);
    } else if (errors.password2) {  
      setPasswordError(errors.password2[0].message);
    } 
  };

  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: data => onSignUpCompleted(data),
    onError: err => console.error(err)    
  });

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {

    const emailError = validate('email', email);
    const passwordError = validate('password', password);

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (emailError || passwordError) {
      return;
    }

    register({ variables: {
      name: name, 
      email: email,
      password1: password,
      password2: password // workaround
    }});
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('Login');
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
        <Text 
          style={styles.signUpLabel}
          category="s1">
          Create an account
        </Text>
      </View>
      <View style={styles.formContainer}>
        <InputField
          autoCapitalize='none'
          placeholder='Full Name'
          accessoryRight={PersonIcon}
          value={name}
          onChangeText={setName}
        />
        <InputField
          autoCapitalize='none'
          placeholder='Email'
          accessoryRight={EmailIcon}
          value={email}
          onChangeText={setEmail}
          error={emailError}
        />
        <InputField
          autoCapitalize='none'
          secureTextEntry={!passwordVisible}
          placeholder='Password'
          accessoryRight={renderEyeIcon}
          value={password}
          onChangeText={setPassword}
          error={passwordError}
        />
      </View>

      {error && <Text status='danger'>{error.message}</Text>}

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
            accessoryRight={FacebookIcon}
          />
          <Button
            appearance='ghost'
            size='giant'
            accessoryRight={GoogleIcon}
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});