// @flow
import React, { useState } from 'react';
import { ListItem } from '@ui-kitten/components';
import { Avatar } from 'expo-activity-feed';

import { PlusIcon, MinusIcon } from './Icons';
import Button from './Button';
import { StyleService } from '@ui-kitten/components';
import { useStyleSheet } from '@ui-kitten/components';


const UserStatusCard = ({ user, currentStatus, onAdd, onRemove }) => {
  const [ isAdded, setIsAdded ] = useState(false);
  const styles = useStyleSheet(themedStyle);
  const description = currentStatus && `${user.name} is ${currentStatus.verb} at ${currentStatus.created}`

  const renderAddToInvitees = () => (
        <Button
          styling={styles.button}
          accessoryLeft={PlusIcon}
          onPress={() => {
            onAdd();
            setIsAdded(!isAdded);
          }}
        />
  );

  const renderRemoveInvitees = () => (
    <Button
      styling={styles.button}
      accessoryLeft={MinusIcon}
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
    button: {
      borderWidth: 1,
      width: 70,
      height: 70,
      borderRadius: 100,
    }
});

export default UserStatusCard;
