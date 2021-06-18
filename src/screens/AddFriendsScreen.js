import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Layout, Divider } from '@ui-kitten/components';

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

function Item(props) {
  return (
    <ListItem {...props} />
  );
}

export default function({ navigation }) {
  
  return (
    <React.Fragment>
      <TopNavigation 
        title='Legg til venner'
        showBackAction
      />
      <Layout style={styles.container}>
        <SearchBox/>

        <LargeHeading>Alternativt</LargeHeading>
        <List
          style={{ marginTop: 5 }}
          data={DATA}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => <Item title={item.title} onPress={item.onPress}/>}
          keyExtractor={(item) => `item-${item.id}`}
          scrollEnabled={false}
        />      
      </Layout>
    </React.Fragment>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 15,
  },
})
