import React from 'react'
import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'


const routeConfig = {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen }
}

const navigationOptions = {
  headerTintColor: '#fb5b5a',
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