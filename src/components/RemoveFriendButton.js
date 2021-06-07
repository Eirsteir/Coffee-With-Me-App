// @flow
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Spinner } from '@ui-kitten/components';

import Button from '../components/Button';
import { useRemoveFriend } from '../hooks/Friends';
import AddFriendButton from './AddFriendButton';


// TODO: unfollow, unfriend, block?
const RemoveFriendButton = ({ user }) => {
  const [ hasRemoved, setHasRemoved ] = useState(false);
  const [unfriend, { data, loading, error }] = useRemoveFriend();

  if (!user) {
    return null;
  }

  const removeFriend = async () => 
    unfriend({ 
      variables: { friend: user.uuid }
    }).then(
      res => {
        AlertAlert.alert("Du og " + user.name + " er ikke lenger venner"),
        setHasRemoved(true);
      },
      err => Alert.alert(err)
    );

    if (hasRemoved) {
        return <AddFriendButton user={user}/>
    }

    return (
        <Button
            onPress={removeFriend}
            children={loading ? <Spinner size='tiny' status='basic'/> : 'Venner'}
        />
    );
};

export default RemoveFriendButton;