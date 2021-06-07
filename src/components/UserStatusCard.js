// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { Avatar } from 'expo-activity-feed';

import Button from './Button';
import { PlusIcon } from './extra/icons';


const UserStatusCard = ({ user, currentStatus }) => {
  
  const description = currentStatus && `${user.name} is ${currentStatus.verb} at ${currentStatus.created}`

  const renderAddToInvitees = () => (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}
        >
          <PlusIcon/>
        </TouchableOpacity>
  );
  
  return (
      <ListItem
        title={user.name}
        description={description || "Ikke sjekket inn"}
        accessoryLeft={() => <Avatar source={user.profilePic} size={42} noShadow />}
        accessoryRight={renderAddToInvitees}
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
