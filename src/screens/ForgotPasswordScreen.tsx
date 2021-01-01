import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { EmailIcon, LockIcon } from '../components/extra/icons';
import { KeyboardAvoidingView } from '../components/extra/3rd-party';

export default ({ navigation }): React.ReactElement => {

  const [email, setEmail] = React.useState<string>();

  const onResetPasswordButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
            <LockIcon style={styles.lockIcon}/>
            <Text
                style={styles.forgotPasswordLabel}
                category='h4'>
                Trouble logging in?
            </Text>
            <Text style={styles.enterEmailLabel}>
                Please enter your email address 
                and we'll send you a link for you 
                to regain access to your account.
            </Text>
        </View>
        <View style={styles.formContainer}>
            <Input
            placeholder='Email'
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
            />
        </View>
        <Button
                size='small'
                style={styles.forgotPasswordButton}
                onPress={onResetPasswordButtonPress}>
                RESET PASSWORD
            </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {     
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    minHeight: 176,
  },
  lockIcon: {
    width: 62,
    height: 72,
  },
  formContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  forgotPasswordLabel: {
    alignSelf: 'center',
    marginTop: 44,
  },
  forgotPasswordButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  enterEmailLabel: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 30,
  },
});