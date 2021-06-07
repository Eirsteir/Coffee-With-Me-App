// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'expo-activity-feed';

import FriendActionButton from './FriendActionButton';
import { useCurrentUser } from '../hooks/User';

const UserCard = ({ user, isFriend, friendshipStatus }) => {
  const { data } = useCurrentUser();
  
  return (
    <View style={styles.container}>
      <Avatar source={user.profilePic} size={42} noShadow />
      <Text style={styles.text}>{user.name}</Text>
      <FriendActionButton 
        user={user} 
        currentUser={data} 
        isFriend={isFriend}
        friendshipStatus={friendshipStatus}
        />
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