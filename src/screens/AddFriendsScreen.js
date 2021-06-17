import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';

import SearchBox from '../components/SearchBox';
import LargeHeading from '../components/LargeHeading';
import TopNavigation from '../components/TopNavigation';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Scan code',
    onPress: () => { return; }
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Browse by university',
    onPress: () => { return; }
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Invite friend',
    onPress: () => { return; }
  },
];

function Item({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function({ navigation }) {
  
  return (
    <React.Fragment>
      <TopNavigation 
        title='Legg til venner'
        showBackAction
      />
      <View style={styles.container}>
        <SearchBox/>

        <LargeHeading>Alternativt</LargeHeading>
        <FlatList
          style={{ marginTop: 5 }}
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} onPress={item.onPress}/>}
          keyExtractor={(item) => `item-${item.id}`}
        />      
      </View>
    </React.Fragment>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: .3,
    borderBottomColor: '#d2d2d2',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 15,
  },
})
