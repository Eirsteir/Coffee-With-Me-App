import React from 'react'
import { createStackNavigator } from 'react-navigation'

import SignIn from '../screens/SignInScreen'
import SignUp from '../screens/SignUpScreen'
import ForgotPassword from '../screens/ForgotPasswordScreen'

const routeConfig = {
    Login: { screen: SignIn },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
}

const navigationOptions = {
  headerStyle: {  borderBottomColor: 'white' },
}

const StackNavigator = createStackNavigator(routeConfig, {
  navigationOptions: navigationOptions}
)

class AuthNavigator extends React.Component {
  render() {
    return (
      <StackNavigator />
    )
  }
}

export default AuthNavigator