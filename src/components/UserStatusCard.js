// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { Avatar } from 'expo-activity-feed';

import Button from './Button';


const UserStatusCard = ({ user, currentStatus }) => {
  
  const description = currentStatus && `${user.name} is ${currentStatus.verb} at ${currentStatus.created}`
  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );
  
  return (
      <ListItem
        title={user.name}
        description={description || "Ikke sjekket inn"}
        accessoryLeft={() => <Avatar source={user.profilePic} size={42} noShadow />}
        accessoryRight={() => <Button children="Inviter" />}
      />
    );
}

const styles = StyleSheet.create({
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
