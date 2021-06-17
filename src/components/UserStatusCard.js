// @flow
import React, { useState } from 'react';
import { ListItem, useTheme } from '@ui-kitten/components';
import { Avatar } from 'expo-activity-feed';

import { PlusIcon, MinusIcon } from './Icons';
import Button from './Button';
import { StyleService } from '@ui-kitten/components';
import { useStyleSheet } from '@ui-kitten/components';
import { ThemeContext } from '../theme-context';


const UserStatusCard = ({ user, currentStatus, onAdd, onRemove }) => {
  const [ isAdded, setIsAdded ] = useState(false);
  const theme = useTheme(ThemeContext);
  const styles = useStyleSheet(themedStyle);
  const description = currentStatus && `${user.name} is ${currentStatus.verb} at ${currentStatus.created}`

  const renderAddIcon = () => (
    <PlusIcon size={50} />
  )

  const renderAddToInvitees = (style) => (
        <PlusIcon
          {...style}
          fill={theme['color-primary-default']} 
          onPress={() => {
            onAdd();
            setIsAdded(!isAdded);
          }}
        />
  );

  const renderRemoveInvitees = (style) => (
    <MinusIcon
      {...style}
      fill={theme['color-danger-default']} 
      onPress={() => {
        onRemove();
        setIsAdded(!isAdded);
      }}
    />
);
    
  return (
      <ListItem
        title={user.name}
        description={description || "Ikke sjekket inn"}
        accessoryLeft={() => <Avatar source={user.profilePic} size={42} noShadow />}
        accessoryRight={isAdded ? renderRemoveInvitees : renderAddToInvitees}
      />
    );
}

const themedStyle = StyleService.create({
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

export default UserStatusCard;
