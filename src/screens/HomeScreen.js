// @flow
import React, { useLayoutEffect, useMemo, useRef, useCallback, useState } from 'react';
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
import { InboxIcon, PlusIcon } from '../components/Icons';
import { View } from 'react-native';

const win = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) =>  {
  const { showBottomSheetModal } = route.params; 
  const bottomSheetModalRef = useRef(null);
  const { loading, error, data: user } = useCurrentUser();
  const friends = useMemo(() => (user !== undefined ? user.me.friends.edges.map((edge) => edge.node) : []), [user]);
  const [ invitees, setInvitees ] = useState(new Set());

  const renderHeaderRightInviteIcon = (props) => {
    return (
    invitees.size ? (
      <View>
        <PlusIcon {...props} />
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: '#ff708d',
            borderRadius: 10,
            position: "absolute",
            right: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{ color: "#fff",  fontSize: 10 }}
          >
            {invitees.size}
          </Text>
        </View>
      </View>
    ) : (
      <PlusIcon {...props} />
    )
  )}

  
  const renderHeaderRightInboxIcon = (props) => {
    return (
    invitees.size ? (
      <View>
        <InboxIcon {...props} />
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: '#ff708d',
            borderRadius: 10,
            position: "absolute",
            right: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{ color: "#fff",  fontSize: 10 }}
          >
            {invitees.size}
          </Text>
        </View>
      </View>
    ) : (
      <InboxIcon {...props} />
    )
  )}

  const onInboxPress = () => navigation.navigate("Inbox");

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction 
        icon={renderHeaderRightInboxIcon} 
        onPress={onInboxPress}/>
      <TopNavigationAction 
        icon={renderHeaderRightInviteIcon} 
        onPress={handlePresentModalPress}/>
    </React.Fragment>
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const addInvitee = useCallback((user) => {
    setInvitees((invitees) => new Set(invitees).add(user));
    console.log(invitees)
  }, [invitees]);

  const removeInvitee = useCallback((user) => {
    setInvitees((invitees) => {
      const next = new Set(invitees);
      next.delete(user);
      return next;
    });
  }, [invitees]);

  if (showBottomSheetModal) {
    handlePresentModalPress();
  }

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
                onAdd={() => addInvitee(item)}
                onRemove={() => removeInvitee(item)}
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
      </Layout>
      
      <InitiateBreakScreen 
          invitees={invitees}
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