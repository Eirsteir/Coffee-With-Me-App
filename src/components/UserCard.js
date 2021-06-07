// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'expo-activity-feed';

import FriendActionButton from './FriendActionButton';
import { useCurrentUser } from '../hooks/User';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@ui-kitten/components';

const UserCard = ({ user, isFriend, friendshipStatus }) => {
  const { data } = useCurrentUser();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.infoContainer} onPress={() => navigation.push('Default', { screen: 'Profil', params: { screen: 'Profile', params: { userId: user.uuid } } })}>
        <Avatar source={user.profilePic} size={42} noShadow />
        <Text style={styles.text}>{user.name}</Text>
      </TouchableOpacity>

      <FriendActionButton
        user={user}
        currentUser={data}
        isFriend={isFriend}
        friendshipStatus={friendshipStatus}
        style={{ flex: 1 }}
      />
    </View>
  );
}

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  infoContainer: {
    flex: 1,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    paddingHorizontal: 5,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '300',
    flex: 1,
  },
});