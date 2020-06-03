// @flow
import React from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import EditProfileForm from '../components/EditProfileForm';
import { BackButton } from 'expo-activity-feed';
import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from 'react-navigation';

type Props = {|
  navigation: NavigationScreen,
|};

export default class EditProfileScreen extends React.Component<Props> {
  _navListener: NavigationEventSubscription;

  static navigationOptions = ({ navigation }: Props) => ({
    title: 'EDIT PROFILE',
    // TODO @Jaap: Probably Text is not the correct component here, probably
    // also good to go back to the profile page after pressing save
    headerRight: (
      <TouchableOpacity 
        style={{ paddingRight: 15 }}
        onPress={navigation.getParam('saveFunc')}
      >
        <Text style={{ color: '#fb5b5a', fontSize: 17 }}>Save</Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
      color: '#000'
    },
    headerTintColor: '#fb5b5a',
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  render() {
    return (
      <EditProfileForm
        registerSave={(saveFunc) => {
          this.props.navigation.setParams({ saveFunc });
        }}
      />
    );
  }
}
