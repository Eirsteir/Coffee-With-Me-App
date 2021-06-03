// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'expo-activity-feed';

import AddFriendButton from './AddFriendButton';
import RemoveFriendButton from './RemoveFriendButton';
import { useCurrentUser } from '../hooks/User';

const UserCard = ({ user, isFriend }) => {
  const { data } = useCurrentUser(user.uuid);

  return (
    <View style={styles.container}>
      <Avatar source={user.profileImage} size={42} noShadow />
      <Text style={styles.text}>{user.name}</Text>
      {isFriend ? <RemoveFriendButton userId={user.uuid} /> : user.uuid !== data?.uuid && <AddFriendButton userId={user.uuid} />}
      <AddFriendButton />
    </View>
  );
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    text: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '300',
        flex: 1,
    },    
});