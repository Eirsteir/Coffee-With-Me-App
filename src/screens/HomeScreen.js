// @flow
import React, { useLayoutEffect, useMemo, useRef, useCallback } from 'react';
import { 
  TouchableOpacity,
  Image, 
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Layout, List, Text, TopNavigationAction } from '@ui-kitten/components';

import TopNavigation from '../components/TopNavigation';
import UserStatusCard from '../components/UserStatusCard';
import LargeHeading from '../components/LargeHeading';
import Button from '../components/Button';
import InitiateBreakScreen from './InitiateBreakScreen';

import { useCurrentUser } from '../hooks/User';
import { BreakVisual } from '../images/index';
import { MenuIcon } from '../components/Icons';


const win = Dimensions.get('window');

const HomeScreen = ({ navigation }) =>  {
  const bottomSheetModalRef = useRef(null);
  const { loading, error, data: user } = useCurrentUser();
  const friends = useMemo(() => (user !== undefined ? user.me.friends.edges.map((edge) => edge.node) : []), [user]);

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={MenuIcon} onPress={handlePresentModalPress}/>
    </React.Fragment>
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <React.Fragment>
      <TopNavigation 
        title='Pause'      
        accessoryRight={renderRightActions} 
      />

    <Layout style={styles.container} level='1'>
      <Image
        resizeMode={'contain'} 
        style={styles.visual}
        source={BreakVisual}
      />
        {user && <LargeHeading>Hei, {user.me.name.split(" ")[0]}</LargeHeading>}
        <Text style={styles.text} category='p1'>På tide med en pause?</Text>

        <Button 
          children="Ta en pause" 
          onPress={handlePresentModalPress}
          styling={styles.button} 
        />

        <LargeHeading>Venneoversikt</LargeHeading>

        <List
          data={friends}
          renderItem={({ item }) => (
              <UserStatusCard 
                user={item}
                currentStatus={item.currentStatus}
              />
          )}
          keyExtractor={(item) => `item-${item.id}`}
          ListEmptyComponent={ () => (
            <Button 
              styling={styles.button}
              onPress={() => navigation.navigate("AddFriends")} 
              children="Legg til venner"
            />
          )}
        />



        {/* <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              position: 'absolute',
              bottom: 10,
              right: 10,
              height: 70,
              backgroundColor: '#fff',
              borderRadius: 100,
            }}
          >
            <Icon name='plus' />
          </TouchableOpacity> */}
      </Layout>
      
      <InitiateBreakScreen 
          bottomSheetModalRef={bottomSheetModalRef}
      />

      </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  button: {
    margin: 10,
  },
  text: {
    margin: 2,
    marginTop: 15,
    paddingLeft: 15,
  },
  visual: {
    alignSelf: 'center',
    width: win.width * .7,
    height: 30 + '%',
    padding: 15,
  },
});

export default HomeScreen;