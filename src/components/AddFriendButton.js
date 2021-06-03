// @flow
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { useUser, useIsAuthenticated } from '../hooks/User';
import { useAddFriend } from '../hooks/Friends';

const AddFriendButton = ({ userId, ...props }) => {
  const { data: user } = useUser(userId);
  const isAuthenticated = useIsAuthenticated();
  const [befriend, { loading, data }] = useAddFriend(userId);
  const [ hasAdded, setHasAdded ] = useState(false);

  if (!user || !isAuthenticated) {
    return null;
  }

  const addFriend = async () => 
    befriend({ 
      variables: { toFriend: userId },
      onCompleted: data => {
        Alert("Du har sendt en venneforespørsel til " + user.name);
        setHasAdded(true);
      },
      onError: e => Alert(e)
    });

  if (hasAdded) {
    return (
      <Button
        onPress={null}
        children="La til venn"
      />
    )
  }

  return (
    <Button
      onPress={addFriend}
      children={loading ? <Spinner size='tiny' status='basic'/> : 'Legg til venn'}
    />
  );
};

export default AddFriendButton;