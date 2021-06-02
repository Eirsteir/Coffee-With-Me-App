// @flow
import React, { useLayoutEffect } from 'react';
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

import AddFriendsHeader from '../components/AddFriendsHeader';

import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from '@react-navigation/native';
import { useEffect } from 'react';

type Props = {|
  navigation: NavigationScreen,
|};

export default function({ navigation }) {

  useLayoutEffect(() => {

    navigation.setOptions({
      title: 'Coffee with me',
      headerTitleStyle: { alignSelf: 'center' },
      headerLeft: () => (
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
      headerRight: () => (
        <AddFriendsHeader navigation={navigation} /> 
      ),
    })
  }, [navigation]);

  return (
      <View style={styles.container}>
  
        <Text style={styles.title}>Invite your friends on a coffee break</Text>
        <Text>You deserve it</Text>

        <View style={styles.dropdownView}>
          <Dropdown
            label='SELECT CAMPUS'
            data={campusData}
            rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
            containerStyle={styles.dropdownContainer}
            inputContainerStyle={styles.inputContainerStyle}
            dropdownOffset={{ 'top': 5, 'left': 0 }}
            pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0 }}
            baseColor='#f5f5f5'
            fontSize={13}
          />
          <Dropdown
            label='SCHEDULE TO'
            data={scheduleData}
            rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
            containerStyle={styles.dropdownContainer}
            inputContainerStyle={styles.inputContainerStyle}
            dropdownOffset={{ 'top': 5, 'left': 0 }}
            pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0 }}
            baseColor='#f5f5f5'
            fontSize={13}
          />
        </View>

        <TouchableOpacity style={styles.inviteBtn} >
          <Text style={styles.inviteText}>INVITE</Text>
        </TouchableOpacity>
      
      </View>
  );
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
  dropdownView: {
    marginTop: 20,
    width: 40 + '%',
  },
  dropdownContainer: {
    width: 100 + '%',
  },
  inputContainerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fb5b5a',
    width: 100 + '%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  inviteBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  },
  inviteText:{
    color:"white",
    fontSize: 18,
  },
});

let campusData = [{
  value: 'Banana', label: 'Gløshaugen'
}, {
  value: 'Mango', label: 'Label'
}, {
  value: 'Pear', label: 'Label'
}];

let scheduleData = [{
  value: 'Banana', label: 'In 5 minutes'
}, {
  value: 'Mango', label: 'In 10 minutes'
}, {
  value: 'Pear', label: 'In 15 minutes'
}];