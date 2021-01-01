import React from 'react'
import { createStackNavigator } from 'react-navigation'

import SignInScreen from '../screens/SignInScreen'
import SignUp from '../screens/SignUpScreen'


const routeConfig = {
    Login: { screen: SignInScreen },
    Register: { screen: SignUp }
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