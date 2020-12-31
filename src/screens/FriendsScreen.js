import React from 'react';
import { View, StatusBar, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Text } from 'react-native';
import { Avatar } from 'expo-activity-feed';

import AddFriendsHeader from '../components/AddFriendsHeader';
import LargeHeading from '../components/LargeHeading';
import HorizontalScrollFeed from '../components/HorizontalScrollFeed';
import FriendCard from '../components/FriendCard';
import UserCard from '../components/UserCard';
import SearchBox from '../components/SearchBox';
import UserService from '../api/services/UserService';

class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interestingUsers: [
        {
          id: 1235,
          user_image: 'https://randomuser.me/api/portraits/women/65.jpg',
          user_name: 'Jane Doe',
        },
        {
          id: 2345,
          user_image: 'https://randomuser.me/api/portraits/men/24.jpg',
          user_name: 'John Doe',
        },
        {
          id: 3456,
          user_image: 'https://randomuser.me/api/portraits/women/45.jpg',
          user_name: 'Jane Doe',
        },
        {
          id: 4567,
          user_image: 'https://randomuser.me/api/portraits/men/45.jpg',
          user_name: 'John Doe',
        },
        {
          id: 6789,
          user_image: 'https://randomuser.me/api/portraits/women/23.jpg',
          user_name: 'Jane Doe',
        },
        {
          id: 7890,
          user_image: 'https://randomuser.me/api/portraits/men/67.jpg',
          user_name: 'John Doe',
        },
        {
          id: 2456,
          user_image: 'https://randomuser.me/api/portraits/women/12.jpg',
          user_name: 'Jane Doe',
        },
      ],
      users: [
        {
          id: 1235,
          name: 'Danny',
          user_image: 'https://randomuser.me/api/portraits/women/65.jpg',
          followed: false,
        },
        {
          id: 2345,
          name: 'James',
          user_image: 'https://randomuser.me/api/portraits/men/24.jpg',
          followed: true,
        },
        {
          id: 3456,
          name: 'Jennifer',
          user_image: 'https://randomuser.me/api/portraits/women/45.jpg',
          followed: false,
        },
        {
          id: 4567,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/men/45.jpg',
          followed: false,
        },
        {
          id: 6789,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/women/23.jpg',
          followed: false,
        },
        {
          id: 7890,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/men/67.jpg',
          followed: false,
        },
        {
          id: 2456,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/women/12.jpg',
          followed: false,
        },
      ],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'FRIENDS',
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
    },
    headerLeft: (
      <View style={{ paddingLeft: 15 }}>
        <Image
          source={require('../../images/icons/categories.png')}
          style={{ width: 23, height: 23 }}
        />
      </View>
    ),
    headerRight:(
        <AddFriendsHeader navigation={navigation} />
      ),
  });

  componentDidMount() {
    this.loadFriends();
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  loadFriends = () => {
    this.setState({ isLoading: true });
    UserService.getFriends()
      .then(friends => {
        this.setState({ friends: friends, isLoading: false });
      })
      .catch(console.log);
  }

  // todo: onRefresh
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchBox objectType={'friends'} />

        <TouchableOpacity style={styles.button} onPress={this.props.navigation.navigate('FriendRequests')}>
          <LargeHeading>Friend requests</LargeHeading>
        </TouchableOpacity>

        <LargeHeading>Recently added</LargeHeading>
        <HorizontalScrollFeed
          data={this.state.interestingUsers}
          renderItem={({ item }) => (
            <View style={{ marginRight: 6, flex: 1, alignItems: 'center' }}>
              <Avatar size={60} noShadow source={item.user_image} />
              <Text style={{ color: '#d2d2d2' }}>{item.user_name.split(" ")[0]}</Text>
            </View>
          )}
          keyExtractor={(item) => `item-${item.id}`}
        />

          <LargeHeading>Friends</LargeHeading>
          <FlatList
            style={{ marginTop: 15 }}
            data={this.state.friends}
            renderItem={({ item }) => (
              <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
                <FriendCard
                  username={'UserName'}
                  subtitle={'@subtitle'}
                  user={item}
                />
              </View>
            )}
            keyExtractor={(item) => `item-${item.id}`}
          />

        {/* TODO: users at same uni */}
        <LargeHeading>People you may know</LargeHeading>
        <FlatList
          style={{ marginTop: 15 }}
          data={this.state.users}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
              <UserCard
                username={'UserName'}
                subtitle={'@subtitle'}
                user={item}
              />
            </View>
          )}
          keyExtractor={(item) => `item-${item.id}`}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    width: 30 + '%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    paddingBottom: 15,
    marginLeft: 15,
    marginTop: 10,
  }
});

export default FriendsScreen;
