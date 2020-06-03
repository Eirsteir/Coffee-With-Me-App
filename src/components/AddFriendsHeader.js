import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

export default function AddFriendsHeader({ navigation }) {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('AddFriends')}  
            style={{ paddingRight: 15 }}
        >
            <Image
                source={require('../../images/icons/add-friends.png')}
                style={{ width: 23, height: 23 }}
            />
        </TouchableOpacity>
    )
}