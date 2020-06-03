// @flow
import React from 'react';
import { StatusBar, View, Text, TouchableOpacity } from 'react-native';
import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from 'react-navigation';

import EditProfileForm from '../components/EditProfileForm';
import { SuccessSnackbar, ErrorSnackbar } from '../components/Snackbar';

type Props = {|
  navigation: NavigationScreen,
|};

const SAVE_FUNC = 'saveFunc';
const ERROR = 'error';

export default class EditProfileScreen extends React.Component<Props> {
  _navListener: NavigationEventSubscription;

  constructor(props) {
    super(props);
    this.state = {
      successSnackbarIsVisible: false,
      errorSnackbarIsVisible: false,
    } 
  }

  static navigationOptions = ({ navigation }: Props) => ({
    title: 'EDIT PROFILE',
    headerRight: (
      <TouchableOpacity 
        style={{ paddingRight: 15 }}
        onPress={() => {
          navigation.getParam(SAVE_FUNC)();
          
          if (navigation.getParam(ERROR) === `undefined`) {
            navigation.goBack();
          }
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
      <View style={{ height: 100 + '%' }}>
        <EditProfileForm
          registerSave={(saveFunc) => {
            this.props.navigation.setParams({ saveFunc });
          }}
          successCallback={() => {
            console.log('SUCCESS');
            this.setState({ successSnackbarIsVisible: true })
          }}
          errorCallback={(error) => {
            console.log('ERROR');
            console.log(error);
            this.setState({ errorSnackbarIsVisible: true })

            this.props.navigation.setParams({ error });
          }}
        />

        <SuccessSnackbar 
            visible={this.state.successSnackbarIsVisible} 
            textMessage="Successfully updated profile" 
            actionHandler={() => { this.setState({ successSnackbarIsVisible: false }) }} 
            actionText="Ok"
        />
        <ErrorSnackbar 
          visible={this.state.errorSnackbarIsVisible} 
          textMessage="Unable to perform update, please try again later" 
          actionHandler={() => { this.setState({ errorSnackbarIsVisible: false }) }} 
          actionText="Dismiss"
        />
      </View>
    );
  }
}
