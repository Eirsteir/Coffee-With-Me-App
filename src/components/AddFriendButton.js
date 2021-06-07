// @flow
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Spinner } from '@ui-kitten/components';

import Button from './Button';
import { PersonAddIcon } from './Icons';
import { useAddFriend } from '../hooks/Friends';
import OutGoingFriendRequestButton from './OutgoingFriendRequestButton';

const AddFriendButton = ({ user, style }) => {
  const [ hasAdded, setHasAdded ] = useState(false);
  const [ addFriend, { data, loading, error }] = useAddFriend({
      variables: { toFriend: user.uuid },
      onCompleted: () => {
        Alert.alert("Du har sendt en venneforespørsel til " + user.name);
        setHasAdded(true);
      },
      onError: err => Alert.alert(err)
  });

  if (!user) {
    return null;
  }

  if (hasAdded) {
    return <OutGoingFriendRequestButton user={user} />
  }

  if (error) {
    Alert.alert(error);
  }

  return (
    <Button
      style={style}
      onPress={addFriend}
      accessoryLeft={PersonAddIcon}
      children={loading ? <Spinner size='tiny' status='basic'/> : 'Legg til venn'}
    />
  );
};

export default AddFriendButton;