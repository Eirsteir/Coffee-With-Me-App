//@flow
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  STREAM_API_KEY,
  STREAM_APP_ID,
} from 'babel-dotenv';

import Icon from '../components/Icon';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import AddFriendsScreen from '../screens/AddFriendsScreen';

import {
  Avatar,
  StreamApp,
  IconBadge,
} from 'expo-activity-feed';
import type { UserResponse } from '../types';


const doNotShowHeaderOption = {
  headerShown: false
};

const navigationOptions = ({ route }) => ({
  tabBarIcon: () => {
    const routeName = route.name;
    if (routeName === 'Home') {
      return <Icon name="home" />;
    } else if (routeName === 'Friends') {
      return <Icon name="friends" />;
    } else if (routeName === 'Notifications') {
      return (
        <IconBadge showNumber>
          <Icon name="notifications" />
        </IconBadge>
      );
    } else if (routeName === 'Profile') {
      return (
        <Avatar
          source={(userData: UserResponse) => userData.data.profileImage}
          size={25}
          noShadow
        />
      );
    }
  },
  ...doNotShowHeaderOption
});

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen}/>
  </HomeStack.Navigator>
);

const FriendsStack = createStackNavigator();
const FriendsStackScreen = () => (
  <FriendsStack.Navigator screenOptions={doNotShowHeaderOption}>
    <FriendsStack.Screen name="Friends" component={FriendsScreen}/>
  </FriendsStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={doNotShowHeaderOption}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
  </ProfileStack.Navigator>
);

const NotificationsStack = createStackNavigator();
const NotificationsStackScreen = () =>  (
  <NotificationsStack.Navigator screenOptions={doNotShowHeaderOption}>
    <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} />
  </NotificationsStack.Navigator>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator  
    initialRouteName="Home"
    screenOptions={navigationOptions}
  >
    <Tab.Screen name="Home" component={HomeStackScreen}/>
    <Tab.Screen name="Friends" component={FriendsStackScreen}/>
    <Tab.Screen name="Notifications" component={NotificationsStackScreen}/>
    <Tab.Screen name="Profile" component={ProfileStackScreen}/>
  </Tab.Navigator>
);

const NavigationStack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <NavigationStack.Navigator screenOptions={doNotShowHeaderOption}>
      <NavigationStack.Screen name="TabNavigator" component={TabNavigator}/>
      <NavigationStack.Screen name="SinglePost" component={SinglePostScreen}/>
      <NavigationStack.Screen name="AddFriends" component={AddFriendsScreen}/>
      <NavigationStack.Screen name="EditProfile" component={EditProfileScreen}/>
    </NavigationStack.Navigator>
  </NavigationContainer>
);

class AppNavigator extends React.Component {

  render() {
    const apiKey = STREAM_API_KEY;
    const appId = STREAM_APP_ID;

    return (
      <StreamApp
        apiKey={apiKey}
        appId={appId}
        // TODO: Pass stream created user token from backend
        token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZDk0YjVjNzktYzQyZC00ZWI4LTg0NTctM2EyNThkZDdmNTkzIn0.lOcnZZnvuJa0FKph2AjE7cM-_ktXn3KZLpeDmFOleIE' 
        defaultUserData={{
          name: '',
          url: '',
          desc: '',
          profileImage: ''
        }}
        errorHandler={console.error} // TODO: update in prod
      >
          <Navigation />
      </StreamApp>
    );
  }
}

export default AppNavigator;
