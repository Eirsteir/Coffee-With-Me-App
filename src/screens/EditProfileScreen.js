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
    headerRight: (
      <TouchableOpacity 
        style={{ paddingRight: 15 }}
        onPress={() => {
          console.log(navigation);
          
          navigation.getParam('saveFunc')();
          navigation.goBack();
        }}
      >
        <Text style={{ color: '#fb5b5a', fontSize: 17 }}>Save</Text>
      </TouchableOpacity>
    ),
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
