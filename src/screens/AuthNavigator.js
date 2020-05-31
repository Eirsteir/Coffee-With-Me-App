import React from 'react'
import { createStackNavigator } from 'react-navigation'

import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'


const routeConfig = {
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
}


const StackNavigator = createStackNavigator(routeConfig
  // , 
  //   {
  //     headerMode: 'none'
  //   }
)

class AuthNavigator extends React.Component {
  render() {
    return (
      <StackNavigator />
    )
  }
}

export default AuthNavigator