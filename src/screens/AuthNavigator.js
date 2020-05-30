import React from 'react'
import { StackNavigator } from 'react-navigation'

import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'


const routeConfig = {
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
}


const StackNav = StackNavigator(routeConfig
  // , 
  //   {
  //     headerMode: 'none'
  //   }
)

class AuthNavigator extends React.Component {
  render() {
    return (
      <StackNav />
    )
  }
}

export default AuthNavigator