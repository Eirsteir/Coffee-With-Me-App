// @flow

import React, { useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Avatar } from 'expo-activity-feed';

import Count from './Count';
import CoverImage from './CoverImage';
import Button from '../components/Button';
import { UserContext } from '../context/UserContext';

type Props = {};

export default function ProfileHeader(props: Props) {
  
  const { profile } = useContext(UserContext);  
  return (
    <ProfileHeaderInner profile={profile} {...props} />
  );
}


class ProfileHeaderInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        username: '',
        profilePic: '',
        friends: {
          totalCount: 0,
        }
      },
    };
  }

  async componentDidMount() {
    let data = await this.props.profile();
    
    this.setState({ user: data });
  }

  async componentDidUpdate() {
    await this.props.profile();
  }

  render() {
    let { name, username, profilePic, friends } = this.state.user;
    
    let friendsCount = friends.totalCount;
    
    StatusBar.setBarStyle('light-content', true);

    return (
      <SafeAreaView style={[styles.profileHeader]}>
        <CoverImage />

        <View style={styles.mainSection}>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userUsername}>{username}</Text>
          </View>
          <Avatar source={profilePic} size={150} noShadow />
        </View>

        <View style={styles.statSection}>
          <Count num={friendsCount}>{`Friend${friendsCount <= 1 ? '' : 's'}`}</Count>
          <Button pressed={() => this.props.navigate('EditProfile')}>
            Edit Profile
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const margin = 15;

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: '#fff',
    paddingBottom: margin,
    width: 100 + '%',
  },
  profileHeaderShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainSection: {
    width: 100 + '%',
    height: 150,
    marginTop: 130,
    marginBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 39,
    color: 'white',
  },
  userUsername: {
    fontSize: 14,
    fontWeight: '500',
    color: '#364047',
    lineHeight: 19,
    paddingLeft: 3,
    marginTop: 7,
  },
  statSection: {
    paddingLeft: margin * 2,
    paddingRight: margin,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});