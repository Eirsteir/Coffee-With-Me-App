import React, { useLayoutEffect, useMemo } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { Avatar } from 'expo-activity-feed';
import { Layout, Text, List, useTheme, TopNavigationAction } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AddFriendsHeader from '../components/AddFriendsHeader';
import LargeHeading from '../components/LargeHeading';
import HorizontalScrollFeed from '../components/HorizontalScrollFeed';
import UserCard from '../components/UserCard';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';

import { useCurrentUser } from '../hooks/User';
import { useFriendingPossibilities } from '../hooks/Friends';
import TopNavigation from '../components/TopNavigation';
import { PersonAddIcon } from '../components/Icons';

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
  const theme = useTheme();
  const { loading, error, data: user } = useCurrentUser();    
  const { 
    loading: friendingPossibilitiesLoading, 
    error: friendingPossibilitiesError, 
    data: friendingPossibilitiesData} = useFriendingPossibilities();

  const friends = useMemo(() => (user !== undefined ? user.me.friends.edges.map((edge) => edge.node) : []), [user]);

  const friendingPossibilitiesCount = friendingPossibilitiesData?.friendingPossibilities.count;

  const renderNavigationRightActions = () => (
    <TopNavigationAction 
      icon={PersonAddIcon}
      onPress={() => navigation.navigate("AddFriends")}
    />
  )

  const renderFriendingPossibilitiesText = () => {
    if (friendingPossibilitiesCount === 0) {
      return (
        <Text>Ingen har lagt deg til enda</Text>
      );
    } else {
      const pluralForm = friendingPossibilitiesCount >= 1 ? 'e' : '';
      return ( 
        <Text>{`${friendingPossibilitiesCount} kaffedrikker${pluralForm} har lagt deg til`}</Text>
      )
    }
  }

  return (
    <React.Fragment>
      <TopNavigation
        title='Venner'
        accessoryRight={renderNavigationRightActions}
      />
      <Layout style={{ flex: 1}} level='1'>
      <ScrollView style={{ flex: 1}}>

        <SearchBox />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme['background-basic-color-3'], marginTop: 10 }]}
          onPress={() => navigation.navigate("FriendRequests")}
        >
          { friendingPossibilitiesError && <Text>Noe gikk galt</Text>}
          { friendingPossibilitiesLoading && <Text>Henter potensielle venner</Text>}
          { friendingPossibilitiesData && renderFriendingPossibilitiesText()}
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
          { friends && 
            <List
            style={{ marginTop: 15 }}
            data={friends}
            renderItem={({ item }) => (
                <UserCard
                  user={item}
                  isFriend={item.isViewerFriend}
                  friendshipStatus={item.friendshipStatus}
                />
            )}
            ListEmptyComponent={ () => (
              <Button 
                styling={{ margin: 10 }}
                onPress={() => navigation.navigate("AddFriends")} 
                children="Legg til venner"
              />
            )}
            keyExtractor={(item) => `item-${item.uuid}`}
          />
          }
        
        {/* TODO: users at same uni */}
        <LargeHeading>Folk du kanskje kjenner</LargeHeading>
        <List
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
      </Layout>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  }
});

export default FriendsScreen;