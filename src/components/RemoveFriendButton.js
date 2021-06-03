// @flow
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button, Spinner } from '../components/Button';
import { useUser, useIsAuthenticated } from '../hooks/User';
import { useRemoveFriend } from '../hooks/Friends';

const RemoveFriendButton = ({ userId, ...props }) => {
  const { data: user } = useUser(userId);
  const isAuthenticated = useIsAuthenticated();
  const [unfriend, { loading, data }] = useRemoveFriend(userId);
    const [ hasRemoved, setHasRemoved ] = useState(false);

  if (!user || !isAuthenticated) {
    return null;
  }

  const removeFriend = async () => 
    unfriend({ 
      variables: { friend: userId },
      onCompleted: data => Alert("Du og " + user.name + " er ikke lenger venner"),
      onError: e => Alert(e)
    });

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