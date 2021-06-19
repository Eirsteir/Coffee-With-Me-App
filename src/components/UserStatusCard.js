// @flow
import React, { useState } from 'react';
import { Text, ListItem, useTheme } from '@ui-kitten/components';
import { View } from 'react-native';
import { Avatar } from 'expo-activity-feed';

import { PlusIcon, MinusIcon, PinIcon } from './Icons';
import { StyleService } from '@ui-kitten/components';
import { useStyleSheet } from '@ui-kitten/components';
import { ThemeContext } from '../theme-context';
import { useNavigation } from '@react-navigation/native';


const UserStatusCard = ({ user, onAdd, onRemove }) => {
  const [ isAdded, setIsAdded ] = useState(false);
  const theme = useTheme(ThemeContext);
  const styles = useStyleSheet(themedStyle);
  const navigation = useNavigation();

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
    
const renderDescription = () => (
  <View style={styles.locationContainer}>
    <PinIcon 
      fill={theme['text-hint-color']} 
      width={12}
      height={12}
    />
    <Text
      appearance='hint'
      category='c2'
      >
      {user.currentLocation?.title || user.preferredLocation?.title || "Ikke sjekket inn"}
    </Text>
  </View>
  );

  return (
      <ListItem
        title={user.name}
        description={renderDescription}
        accessoryLeft={() => <Avatar source={user.profilePic} size={42} noShadow />}
        accessoryRight={isAdded ? renderRemoveInvitees : renderAddToInvitees}
        onPress={() => navigation.push('Default', { screen: 'Profil', params: { screen: 'Profile', params: { userId: user.uuid } } })}
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
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 6
    },
    location: {
      marginVertical: 8,
    },
});

export default UserStatusCard;
