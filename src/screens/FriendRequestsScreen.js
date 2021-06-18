import React, { useMemo, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Layout, Divider, Text, Spinner } from '@ui-kitten/components';

import LargeHeading from '../components/LargeHeading';
import UserCard from '../components/UserCard';
import SearchBox from '../components/SearchBox';
import EmptyStateActionButton from '../components/EmptyStateActionButton';

import { useFriendingPossibilities } from '../hooks/Friends';
import { useCurrentUser } from '../hooks/User';
import TopNavigation from '../components/TopNavigation';

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

    
  const renderListEmptyComponent = () => {
    if (loading) {
      return (
        <View styles={styles.loading}>
          <Spinner />
        </View>
      )
    }

    return (
      <Layout level='4' style={styles.emptyStateActionButtonContainer}>
        <EmptyStateActionButton 
            title='Her var det ikke mye å vise'
            buttonText='Finn venner'
            hint='Kom i gang og legg til noen venner'
            onPress={() => navigation.navigate("AddFriends")}
        />
      </Layout>
    )
  }
  return (
    <React.Fragment>
        
        <TopNavigation
            title="La deg til"
            showBackAction />

        <Layout style={{ flex: 1}} level='1'>
            
            <SearchBox />
            
            { friendingPossibilitiesError && <Text>Noe gikk galt</Text>}
            { friendingPossibilitiesLoading && <Text>Henter potensielle venner</Text>}
            
            {(results && results.length >= 1) ? (
                <List
                data={results}
                ItemSeparatorComponent={Divider}
                ListEmptyComponent={error?.message}
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
            ) : (
                renderListEmptyComponent()
            )}
            
        </Layout>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },
    emptyStateActionButtonContainer: {
        flex:1,
        paddingVertical: 90,
    },
});

export default FriendRequestsScreen;