import React, { useState, useMemo, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SearchBar } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import { Divider, Text, useTheme } from '@ui-kitten/components';

import SEARCH_USERS from '../graphql/searchUsers.query';
import UserCard from './UserCard';
import { ThemeContext } from '../theme-context';
import { Platform } from 'react-native';

const SearchBox = () => {
  const theme = useTheme(ThemeContext);
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
          showLoading={loading}
          platform={Platform.OS}
          onChangeText={search}
          onClear={(text) => search('')}
          placeholder="Søk..."
          value={query}
          inputContainerStyle={{backgroundColor: theme['background-basic-color-3']}}
          leftIconContainerStyle={{backgroundColor: theme['background-basic-color-3']}}
          inputStyle={{backgroundColor: theme['background-basic-color-3']}}
          containerStyle={{
            backgroundColor: theme['background-basic-color-1'],
            justifyContent: 'space-around',
            borderTopWidth:0,
            borderBottomWidth:0,
          }}
        />          
          {loading && <Text>Loading...</Text>}
          {isOpen && 
            <FlatList
            style={{ marginTop: 15 }}
            data={results}
            listEmptyComponent={error?.message || 'Fant ingen brukere'}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <View style={{ marginLeft: 15, marginRight: 15}}>
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
