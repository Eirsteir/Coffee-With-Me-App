// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'expo-activity-feed';

import AddFriendButton from './AddFriendButton';

export default class FriendCard extends React.Component {
  static defaultProps = {};
  
  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <Avatar source={user.profileImage} size={42} noShadow />
        <Text style={styles.text}>{user.name}</Text>

        <AddFriendButton />
      </View>
    );
  }
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