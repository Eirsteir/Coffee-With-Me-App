import { useLazyQuery } from '@apollo/client';
import React, { useState, useMemo } from 'react';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView, View, Image, Text, StyleSheet, Animated, FlatList, ListItem } from 'react-native';
import SEARCH_USERS from '../graphql/searchUsers.query';
import UserCard from './UserCard';

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ query, setQuery ] = useState("");
  const [ searchUsers, { data, loading, error }] = useLazyQuery(SEARCH_USERS);
  const results = useMemo(() => (data !== undefined ? data.searchUsers.edges.map((edge) => edge.node) : []), [data]);

  const search = query => {
    setQuery(query);

    if (query) {
      setIsOpen(true);
      searchUsers({
        variables: { query: query, first: 10 },
        suspend: false
      }); 
    } else {
      // clear results
      setIsOpen(false);
    }
  };

  return (
      <View>
      <SearchBar
          round
          showCancel
          lightTheme
          onChangeText={search}
          onClear={(text) => search('')}
          placeholder="Søk..."
          value={query}
        />          
          {loading && <Text>Loading...</Text>}
          {isOpen && 
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
          }
      </View>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 28,
    borderRadius: 4,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    position: 'absolute',
    color: '#8E8E93',
    fontSize: 14,
  },
  textInput: {
    paddingLeft: 5,
    paddingRight: 5,
    width: 100 + '%',
  },
});

export default SearchBox;
