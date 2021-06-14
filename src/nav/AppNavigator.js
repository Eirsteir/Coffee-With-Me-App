//@flow
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, BottomNavigationTab, StyleService, useStyleSheet } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StreamApp } from 'expo-activity-feed';

import {
  STREAM_API_KEY,
  STREAM_APP_ID,
} from 'babel-dotenv';

import { ThemeContext } from '../theme-context';
import { HomeIcon, FriendsIcon, ProfileIcon, NotificationIcon } from '../components/Icons';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import AddFriendsScreen from '../screens/AddFriendsScreen';
import FriendRequestsScreen from '../screens/FriendRequestsScreen';


const doNotShowHeaderOption = {
  headerShown: false
};

const navigationOptions = ({ route }) => ({
  tabBarIcon: ({ color, size, tintColor }) => {
    const routeName = route.name;
    if (routeName === 'Home') {
      return <HomeIcon  width={25} height={25} fill={tintColor}/>;
    } else if (routeName === 'Venner') {
      return <FriendsIcon />;
    } else if (routeName === 'Aktivitet') {
      return <NotificationIcon />;
    } else if (routeName === 'Profil') {
      return <ProfileIcon/>;
    }
  },
  ...doNotShowHeaderOption
});

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ safeAreaInsets: { top: 0 }, ...doNotShowHeaderOption }}>
    <HomeStack.Screen name="Home" component={HomeScreen}/>
  </HomeStack.Navigator>
);

const FriendsStack = createStackNavigator();
const FriendsStackScreen = () => (
  <FriendsStack.Navigator initialRouteName="Friends">
    <FriendsStack.Screen name="Friends" component={FriendsScreen}/>
    <NavigationStack.Screen name="FriendRequests" component={FriendRequestsScreen}/>
  </FriendsStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator mode="modal" screenOptions={{ safeAreaInsets: { top: 0 }, ...doNotShowHeaderOption }}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} initialParams={{ userId: undefined }}/>
    <NavigationStack.Screen name="EditProfile" component={EditProfileScreen}/>
  </ProfileStack.Navigator>
);

const NotificationsStack = createStackNavigator();
const NotificationsStackScreen = () =>  (
  <NotificationsStack.Navigator>
    <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} />
  </NotificationsStack.Navigator>
);

const BottomTabBar = ({ navigation, state }) => {
  const styles = useStyleSheet(themedStyle);

  return (
  <SafeAreaView style={styles.container}>
  <BottomNavigation
    appearance='noIndicator'
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon}/>
    <BottomNavigationTab icon={FriendsIcon}/>
    <BottomNavigationTab icon={NotificationIcon}/>
    <BottomNavigationTab icon={ProfileIcon}/>
  </BottomNavigation>
  </SafeAreaView>
)};

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator  
    initialRouteName="Home"
    screenOptions={navigationOptions}
    tabBar={props => <BottomTabBar {...props} />}
  >
    <Tab.Screen name="Home" component={HomeStackScreen}/>
    <Tab.Screen name="Venner" component={FriendsStackScreen}/>
    <Tab.Screen name="Aktivitet" component={NotificationsStackScreen}/>
    <Tab.Screen name="Profil" component={ProfileStackScreen}/>
  </Tab.Navigator>
);

const NavigationStack = createStackNavigator();

const Navigation = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <NavigationContainer theme={themeContext.theme === "dark" ? DarkTheme : DefaultTheme}>
      <NavigationStack.Navigator screenOptions={doNotShowHeaderOption}>
        <NavigationStack.Screen name="Default" component={TabNavigator} options={doNotShowHeaderOption}/>
        <NavigationStack.Screen name="SinglePost" component={SinglePostScreen}/>
        <NavigationStack.Screen name="AddFriends" component={AddFriendsScreen}/>
      </NavigationStack.Navigator>
    </NavigationContainer>
  )
};


const AppNavigator = () => {

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

const themedStyle = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
});

export default AppNavigator;
