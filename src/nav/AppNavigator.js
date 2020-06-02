//@flow
import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import {
  STREAM_API_KEY,
  STREAM_APP_ID,
  STREAM_API_TOKEN,
} from 'babel-dotenv';

import Icon from '../components/Icon';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import StatusUpdateScreen from '../screens/StatusUpdateScreen';

import {
  Avatar,
  StreamApp,
  IconBadge,
} from 'expo-activity-feed';
import type { UserResponse } from '../types';

// $FlowFixMe
const NotificationsStack = createStackNavigator({
  Notifications: { screen: NotificationsScreen },
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
});

const FriendsStack = createStackNavigator({
  Friends: { screen: FriendsScreen },
});

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Friends: FriendsStack,
    Notifications: NotificationsStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return <Icon name="home" />; // todo: coffee cup icon
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
    }),
    initialRouteName: 'Home',
  },
);

const doNotShowHeaderOption = {
  navigationOptions: {
    header: null,
  },
};

const Navigation = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    ...doNotShowHeaderOption,
  },
  SinglePost: { screen: SinglePostScreen },
  NewPost: { screen: StatusUpdateScreen },
  EditProfile: { screen: EditProfileScreen },
});

class AppNavigator extends React.Component {

  render() {
    let apiKey = STREAM_API_KEY;
    let appId = STREAM_APP_ID;
    let token = STREAM_API_TOKEN;   

    return (
      <StreamApp
        apiKey={apiKey}
        appId={appId}
        token={this.props.token} 
        defaultUserData={{
          name: '',
          url: '',
          desc: '',
          profileImage: ''
        }}
      >
        <Navigation />
      </StreamApp>
    );
  }
}

export default AppNavigator;
