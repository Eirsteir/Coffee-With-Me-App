// @flow
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Spinner } from '@ui-kitten/components';

import Button from '../components/Button';
import { useRemoveFriend } from '../hooks/Friends';

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
        Alert("Du og " + user.name + " er ikke lenger venner"),
        setHasRemoved(true);
      },
      err => Alert(err)
    );

    if (hasRemoved) {
        return (
            <Button
                onPress={null}
                children="Fjernet venn"
            />
        )
    }

    return (
        <Button
            onPress={removeFriend}
            children={loading ? <Spinner size='tiny' status='basic'/> : 'Venner'}
        />
    );
};

export default RemoveFriendButton;