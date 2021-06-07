// @flow
import React, { useLayoutEffect, useMemo, useRef, useCallback } from 'react';
import { 
  TouchableOpacity,
  Image, 
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Avatar } from 'expo-activity-feed';
import { Icon, Layout, List, Text } from '@ui-kitten/components';

import AddFriendsHeader from '../components/AddFriendsHeader';
import UserStatusCard from '../components/UserStatusCard';
import LargeHeading from '../components/LargeHeading';
import Button from '../components/Button';
import InitiateBreakScreen from './InitiateBreakScreen';

import { useCurrentUser } from '../hooks/User';
import { BreakVisual } from '../images/index';


const win = Dimensions.get('window');

const HomeScreen = ({ navigation }) =>  {
  const bottomSheetModalRef = useRef(null);
  const { loading, error, data: user } = useCurrentUser();
  const friends = useMemo(() => (user !== undefined ? user.me.friends.edges.map((edge) => edge.node) : []), [user]);

  useLayoutEffect(() => {

    navigation.setOptions({
      title: 'Coffee with me',
      headerTitleStyle: { alignSelf: 'center' },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ paddingLeft: 15 }}
        >
          <Avatar
            source={(userData) => userData.data.profileImage}
            size={23}
            noShadow
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <AddFriendsHeader navigation={navigation} /> 
      ),
    })
  }, [navigation]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
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

        <InitiateBreakScreen 
          bottomSheetModalRef={bottomSheetModalRef}
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