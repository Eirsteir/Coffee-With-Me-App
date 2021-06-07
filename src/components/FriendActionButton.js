import React from 'react';
import { Text } from 'react-native';

import AddFriendButton from './AddFriendButton';
import RemoveFriendButton from './RemoveFriendButton';
import IncomingFriendRequestButton from './IncomingFriendRequestButton';
import OutgoingFriendRequestButton from './OutgoingFriendRequestButton';


const FriendActionButton = ({ currentUser, user, friendshipStatus, isFriend, style }) => {

    if (user.uuid === currentUser?.uuid) {
      return <Text></Text>;
    } else if (friendshipStatus === "OUTGOING_REQUEST") {
      return <OutgoingFriendRequestButton user={user} style={style} /> 
    } else if (friendshipStatus === "INCOMING_REQUEST") {
      return <IncomingFriendRequestButton user={user} style={style} />
    } else if (isFriend) {
      return <RemoveFriendButton user={user} style={style} />;
    }

    return <AddFriendButton user={user} style={style} />;    
}

export default FriendActionButton;