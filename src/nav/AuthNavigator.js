import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignInScreen'
import ForgotPassword from '../screens/ForgotPasswordScreen'
import RegisterEmailScreen from '../screens/Register/RegisterEmailScreen';
import RegisterNameScreen from '../screens/Register/RegisterNameScreen';
import RegisterPasswordScreen from '../screens/Register/RegisterPasswordScreen';
import RegisterUsernameScreen from '../screens/Register/RegisterUsernameScreen';
import ChangeUsernameScreen from '../screens/Register/ChangeUsernameScreen';
import RegisterLocationScreen from '../screens/Register/RegisterLocationScreen';

const navigationOptions = {
  headerStyle: {
    borderBottomWidth: 0,
    height: 0,
  }
}

const disableBackOptions = { 
  headerShown: false, 
  gestureEnabled: false 
}

const RegisterStack = createStackNavigator();

const RegisterStackScreen = () => (
  <RegisterStack.Navigator screenOptions={{headerShown: false}}>
    <RegisterStack.Screen 
      name='RegisterEmail' 
      component={RegisterEmailScreen} />
    <RegisterStack.Screen 
      name='RegisterName' 
      component={RegisterNameScreen} 
      initialParams={{ email: undefined }} options={disableBackOptions}/>
    <RegisterStack.Screen 
      name='RegisterPassword' 
      component={RegisterPasswordScreen} 
      initialParams={{ email: undefined, name: undefined }} 
      options={disableBackOptions} />
    <RegisterStack.Screen 
      name='RegisterLocation' 
      component={RegisterLocationScreen} 
      initialParams={{ email: undefined, name: undefined, password: undefined, }} 
      options={disableBackOptions} />
    <RegisterStack.Screen 
      name='RegisterUsername' 
      component={RegisterUsernameScreen}
      initialParams={{ email: undefined, name: undefined, password: undefined, username: undefined, location: undefined }} 
      options={disableBackOptions}/>
    <RegisterStack.Screen 
      name='ChangeUsername' 
      component={ChangeUsernameScreen} 
      initialParams={{ email: undefined, name: undefined, password: undefined, username: undefined, location: undefined }} 
      options={disableBackOptions} />
  </RegisterStack.Navigator>
);

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={navigationOptions}
      >
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={RegisterStackScreen} options={disableBackOptions}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </ NavigationContainer>
  )
}

export default AuthNavigator;