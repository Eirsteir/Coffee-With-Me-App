// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'expo-activity-feed';

import AddFriendButton from './AddFriendButton';
import RemoveFriendButton from './RemoveFriendButton';
import { useCurrentUser } from '../hooks/User';
import IncomingFriendRequestButton from './IncomingFriendRequestButton';
import OutgoingFriendRequestButton from './OutgoingFriendRequestButton';

const UserCard = ({ user, isFriend, friendshipStatus }) => {
  const { data } = useCurrentUser();

  const FriendActionButton = () => {
    if (user.uuid === data?.uuid) {
      return <Text></Text>;
    } else if (friendshipStatus === "OUTGOING_REQUEST") {
      return <OutgoingFriendRequestButton user={user} /> 
    } else if (friendshipStatus === "INCOMING_REQUEST") {
      return <IncomingFriendRequestButton user={user} />
    } else if (isFriend) {
      return <RemoveFriendButton user={user} />;
    }

    return <AddFriendButton user={user} />;    
  }
  
  return (
    <View style={styles.container}>
      <Avatar source={user.profilePic} size={42} noShadow />
      <Text style={styles.text}>{user.name}</Text>
      <FriendActionButton />
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