// @flow
import React from 'react';
import { StatusBar, Image, TouchableOpacity, View, StyleSheet } from 'react-native';

import { Avatar } from 'expo-activity-feed';
import type { UserResponse, ActivityData } from '../types';

import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from 'react-navigation';

type Props = {|
  navigation: NavigationScreen,
|};

class HomeScreen extends React.Component<Props> {
  _navListener: NavigationEventSubscription;
  static navigationOptions = ({ navigation }: Props) => ({
    title: 'HOME',
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{ paddingLeft: 15 }}
      >
        <Avatar
          source={(userData: UserResponse) => userData.data.profileImage}
          size={23}
          noShadow
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('NewPost')}  // todo: what here?
        style={{ paddingRight: 15 }}
      >
        <Image source={PostIcon} style={{ width: 23, height: 23 }} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  _onPressActivity = (activity: ActivityData) => {
    this.props.navigation.navigate('SinglePost', {
      activity: activity,
    });
  };

  render() {
    return (
        <View style={styles.container}>
          
          {/* Universitys campuses dropdown */}
          {/* Schedule to in minutes */}
          {/* INVITE */}

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
