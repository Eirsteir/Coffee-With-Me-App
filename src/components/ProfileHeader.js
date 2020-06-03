// @flow

import React, { useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Count from './Count';
import { Avatar } from 'expo-activity-feed';
import CoverImage from './CoverImage';

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
        nickname: '',
        friendsCount: 0,
        university: {},
      },
    };
  }

  async componentDidMount() {
    let data = await this.props.profile();
    
    this.setState({ user: data });
  }

  render() {
    let { name, nickname, friendsCount, university } = this.state.user;
    let profileImage = null;
    
    StatusBar.setBarStyle('light-content', true);

    return (
      <SafeAreaView style={[styles.profileHeader]}>
        <CoverImage />

        <View style={[styles.mainSection]}>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userNickname}>{nickname}</Text>
            <Text style={styles.userUniversity}>{university.name}</Text>
          </View>
          <Avatar source={profileImage} size={150} noShadow />
        </View>

        <View style={styles.statSection}>
          <Count num={friendsCount}>{`Friend${friendsCount <= 1 ? '' : 's'}`}</Count>
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
  userNickname: {
    fontSize: 14,
    fontWeight: '500',
    color: '#364047',
    lineHeight: 19,
    paddingLeft: 3,
    marginTop: 7,
  },
  userUniversity: {
    fontSize: 18,
    paddingTop:10,
    paddingLeft: 3,
  },
  statSection: {
    paddingLeft: margin * 2,
    paddingRight: margin,
    flexDirection: 'row',
  },
});