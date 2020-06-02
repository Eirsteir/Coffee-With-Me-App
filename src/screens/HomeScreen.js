// @flow
import React from 'react';
import { 
  StatusBar, 
  Image, 
  Text, 
  TouchableOpacity,
  View, 
  StyleSheet,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import { Avatar } from 'expo-activity-feed';
import type { UserResponse, ActivityData } from '../types';

import PostIcon from '../../images/icons/post.png';

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

    let data = [{
      value: 'Banana', label: 'Label'
    }, {
      value: 'Mango', label: 'Label'
    }, {
      value: 'Pear', label: 'Label'
    }];

    return (
        <View style={styles.container}>
    
          <Text style={styles.title}>Invite your friends on a coffee break</Text>
          <Text>You deserve it</Text>
          <Dropdown
            label='Campus'
            data={data}
            rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
            containerStyle={styles.dropdownContainer}

          />
          <Dropdown
            label='Schedule to'
            data={data}
            rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
            containerStyle={styles.dropdownContainer}
          />

          <TouchableOpacity style={styles.inviteBtn} >
            <Text style={styles.inviteText}>INVITE</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 20,
  },
  dropdownContainer: {
    width: 30 + '%',
  },
  inviteBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  inviteText:{
    color:"white",
    fontSize: 15,
  },
});

export default HomeScreen;
