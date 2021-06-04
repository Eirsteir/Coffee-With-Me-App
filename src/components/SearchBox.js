import { useLazyQuery } from '@apollo/client';
import React, { useState, useMemo } from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, FlatList } from 'react-native';

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
      setIsOpen(false);
    }
  };

  return (
    <>
      <SearchBar
          round
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
      </>
  );
}

export default SearchBox;
