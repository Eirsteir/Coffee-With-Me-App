import React, { useLayoutEffect } from 'react';
import { View, TouchableOpacity, Image, ScrollView, FlatList, Text } from 'react-native';
import { Avatar } from 'expo-activity-feed';

import AddFriendsHeader from '../components/AddFriendsHeader';
import LargeHeading from '../components/LargeHeading';
import HorizontalScrollFeed from '../components/HorizontalScrollFeed';
import UserCard from '../components/UserCard';
import SearchBox from '../components/SearchBox';
import { useCurrentUser } from '../hooks/User';
import { useFriendingPossibilities } from '../hooks/Friends';

const INTERESTING_USERS = [
  {
    id: 1235,
    user_image: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Jane Doe',
  },
  {
    id: 2345,
    user_image: 'https://randomuser.me/api/portraits/men/24.jpg',
    name: 'John Doe',
  },
  {
    id: 3456,
    user_image: 'https://randomuser.me/api/portraits/women/45.jpg',
    name: 'Jane Doe',
  },
  {
    id: 4567,
    user_image: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'John Doe',
  },
  {
    id: 6789,
    user_image: 'https://randomuser.me/api/portraits/women/23.jpg',
    name: 'Jane Doe',
  },
  {
    id: 7890,
    user_image: 'https://randomuser.me/api/portraits/men/67.jpg',
    name: 'John Doe',
  },
  {
    id: 2456,
    user_image: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Jane Doe',
  },
]

const FriendsScreen = ({ navigation }) => {
  const { loading, error, data: user } = useCurrentUser();    
  const { 
    loading: friendingPossibilitiesLoading, 
    error: friendingPossibilitiesError, 
    data: friendingPossibilities} = useFriendingPossibilities();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Venner',
      headerTitleStyle: {
        fontWeight: '500',
        fontSize: 13,
      },
      headerLeft: () => (
        <View style={{ paddingLeft: 15 }}>
          <Image
            source={require('../../images/icons/categories.png')}
            style={{ width: 23, height: 23 }}
          />
        </View>
      ),
      headerRight: () => (
          <AddFriendsHeader navigation={navigation} />
        ),
    })
  }, [navigation]);

// todo: onRefresh
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <SearchBox objectType={'friends'} />

      <TouchableOpacity onPress={navigation.navigate('FriendRequests')}>
        { friendingPossibilitiesError && <Text>Noe gikk galt</Text>}
        { friendingPossibilitiesLoading && <Text>Henter potensielle venner</Text>}
        { friendingPossibilities && !friendingPossibilitiesLoading && 
          friendingPossibilities.count > 0 
          ? <Text>{friendingPossibilities.count} kaffedrikkere har lagt deg til! Se mer</Text> 
          : <Text>Legg til venner</Text>}
      </TouchableOpacity>

      <LargeHeading>Nylig lagt til</LargeHeading>
      <HorizontalScrollFeed
        data={INTERESTING_USERS}
        renderItem={({ item }) => (
          <View style={{ marginRight: 6, flex: 1, alignItems: 'center' }}>
            <Avatar size={60} noShadow source={item.user_image} />
            <Text style={{ color: '#d2d2d2' }}>{item.name.split(" ")[0]}</Text>
          </View>
        )}
        keyExtractor={(item) => `item-${item.id}`}
      />

        <LargeHeading>Dine venner</LargeHeading>
        { error && <Text>Noe gikk galt</Text>}
        { loading && <Text>Henter dine venner</Text>}
        <FlatList
          style={{ marginTop: 15 }}
          data={user.friends}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
              <UserCard
                user={item}
                isFriend={false}
              />
            </View>
          )}
          keyExtractor={(item) => `item-${item.id}`}
        />

      {/* TODO: users at same uni */}
      <LargeHeading>Folk du kanskje kjenner</LargeHeading>
      <FlatList
        style={{ marginTop: 15 }}
        data={INTERESTING_USERS}
        renderItem={({ item }) => (
          <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
            <UserCard
              user={item}
              isFriend={false}
            />
          </View>
        )}
        keyExtractor={(item) => `item-${item.id}`}
      />
    </ScrollView>
  );

}

export default FriendsScreen;