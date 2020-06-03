import React from 'react';
import { View, Image } from 'react-native';

export default function AddFriendsHeader() {
    return (
    <View style={{ paddingRight: 15 }}>
        <Image
          source={require('../../images/icons/add-friends.png')}
          style={{ width: 23, height: 23 }}
        />
      </View>
    )
}