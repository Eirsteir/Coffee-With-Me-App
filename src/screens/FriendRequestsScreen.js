import React, { useMemo, useLayoutEffect } from 'react';
import { View, ScrollView, FlatList, Text, } from 'react-native';

import LargeHeading from '../components/LargeHeading';
import UserCard from '../components/UserCard';
import { useCurrentUser } from '../hooks/User';
import { useFriendingPossibilities } from '../hooks/Friends';
import SearchBox from '../components/SearchBox';

const FriendRequestsScreen = ({ navigation }) => {
  const { loading, error, data: user } = useCurrentUser();    
  const { 
    loading: friendingPossibilitiesLoading, 
    error: friendingPossibilitiesError, 
    data} = useFriendingPossibilities();
    const results = useMemo(() => (
        data !== undefined 
        ? data.friendingPossibilities.edges.map((edge) => edge.node) 
        : []
        ), [data]);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'La deg til',
            headerTitleAlign: 'center',
        })
    }, [navigation]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchBox />
        
        <LargeHeading>Venneforespørsler</LargeHeading>
        { friendingPossibilitiesError && <Text>Noe gikk galt</Text>}
        { friendingPossibilitiesLoading && <Text>Henter potensielle venner</Text>}
        <FlatList
            style={{ marginTop: 15 }}
            data={results}
            listEmptyComponent={error?.message || 'Fant ingen brukere'}
            renderItem={({ item }) => (
                <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
                    <UserCard
                    user={item}
                    isFriend={item.isViewerFriend}
                    friendshipStatus={item.friendshipStatus}
                    />
                </View>
            )}
            keyExtractor={(item) => `item-${item.uuid}`}
        />
    </ScrollView>
  );
}

export default FriendRequestsScreen;