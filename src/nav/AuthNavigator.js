import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignInScreen'
import SignUp from '../screens/SignUpScreen'
import ForgotPassword from '../screens/ForgotPasswordScreen'
  
const navigationOptions = {
  headerStyle: {  borderBottomColor: 'white' },
}

const Stack = createStackNavigator();

class AuthNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator 
        screenOptions={navigationOptions}
      >
        <Stack.Screen component={SignIn}></Stack.Screen>
        <Stack.Screen component={SignUp}></Stack.Screen>
        <Stack.Screen component={ForgotPassword}></Stack.Screen>
      </Stack.Navigator>
    )
  }
}

export default AuthNavigator