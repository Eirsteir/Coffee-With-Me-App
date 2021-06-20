// @flow
import React, { useCallback } from 'react';

import Button from '../Button';
import { ChevronDown } from '../Icons';


const RemoveFriendButton = ({ user, bottomSheetModalRef }) => {

  if (!user) {
    return null;
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

    return (
      <Button
          appearence='ghost'
          accessoryRight={ChevronDown}
          onPress={handlePresentModalPress}
          children={'Venner'}
      />
    );
};

export default RemoveFriendButton;