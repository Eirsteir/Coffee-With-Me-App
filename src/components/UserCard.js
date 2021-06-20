// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'expo-activity-feed';
import { ListItem } from '@ui-kitten/components';

const UserCard = ({ user, ...listItemProps }) => {
  const navigation = useNavigation();

  return (
    <ListItem 
      {...listItemProps}
      title={user.username}
      description={user.name}
      accessoryLeft={(style) => <Avatar {...style} style={{marginRight: 100}} source={user.profilePic} size={50} noShadow />}
      onPress={() => navigation.push('Default', { screen: 'Profil', params: { screen: 'Profile', params: { userId: user.uuid } } })}
      />
  );
}

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  infoContainer: {
    flex: 1,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '300',
    flex: 1,
  },
});