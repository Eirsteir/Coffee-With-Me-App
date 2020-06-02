// @flow

import React from 'react';
import { StyleSheet, ScrollView, StatusBar, View, Text } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import Button from '../components/Button';

import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from 'react-navigation';

type Props = {|
  navigation: NavigationScreen,
|};

export default class ProfileScreen extends React.Component<Props> {
  _navListener: NavigationEventSubscription;
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    headerRight: (
      <Button pressed={() => navigation.navigate('EditProfile')}>
        Edit Profile
      </Button>
    ),
    headerTransparent: true,
    headerBackTitle: null,
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProfileHeader />
        <View style={styles.container} >
          <Text>HISTORY</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 100 + '%'
  }
})