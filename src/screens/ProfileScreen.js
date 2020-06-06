// @flow

import React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';

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
      <View style={{ height: 100 + '%', backgroundColor: '#fff'}}>
        <ProfileHeader navigate={this.props.navigation.navigate}/>
        <View style={styles.historyContainer} >
          <Text>HISTORY</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: .2,
    borderColor: '#d3d3d3',
    paddingTop: 10,
    marginTop: 20,
  }
})