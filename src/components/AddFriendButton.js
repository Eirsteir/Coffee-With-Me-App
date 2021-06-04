// @flow
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Spinner } from '@ui-kitten/components';

import Button from '../components/Button';
import { useAddFriend } from '../hooks/Friends';

const AddFriendButton = ({ user }) => {
  const [ hasAdded, setHasAdded ] = useState(false);
  const [befriend, { data, loading, error }] = useAddFriend();

  if (!user) {
    return null;
  }
  const addFriend = async () => {
    befriend({ 
      variables: { toFriend: user.uuid }
    }).then(
      res => {
        Alert("Du har sendt en venneforespørsel til " + user.name);
        setHasAdded(true);
      },
      err => Alert(err)
    );
  }

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
      children={loading ? <Spinner size='tiny' status='basic'/> : 'Legg til'}
    />
  );
};

export default AddFriendButton;