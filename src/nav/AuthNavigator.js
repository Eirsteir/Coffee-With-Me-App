import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignInScreen'
import SignUp from '../screens/SignUpScreen'
import ForgotPassword from '../screens/ForgotPasswordScreen'
  
const navigationOptions = {
  headerStyle: {  borderBottomColor: 'white' },
}

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={navigationOptions}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </ NavigationContainer>
  )
}

export default AuthNavigator;