// @flow
import React, { useLayoutEffect, useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { 
  TouchableOpacity,
  Image, 
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Layout, List, Spinner, Text, TopNavigationAction } from '@ui-kitten/components';

import TopNavigation from '../../components/TopNavigation';
import UserStatusCard from '../../components/UserStatusCard';
import LargeHeading from '../../components/LargeHeading';
import Button from '../../components/Button';
import InitiateBreakBottomSheet from './components/InitiateBreakBottomSheet';
import EmptyStateActionButton from '../../components/EmptyStateActionButton';
import FriendsOverview from './components/FriendsOverview';

import { useCurrentUser } from '../../hooks/User';
import { BreakVisual } from '../../images/index';
import { InboxIcon, PlusIcon } from '../../components/Icons';
import { View } from 'react-native';
import { NetworkStatus } from '@apollo/client';

const win = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) =>  {
  const { showBottomSheetModal } = route.params; 
  const bottomSheetModalRef = useRef(null);
  const { loading, error, refetch, networkStatus, data: user } = useCurrentUser();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const friends = useMemo(() => (user !== undefined ? user.me.friends.edges.map((edge) => edge.node) : []), [user]);
  const [ invitees, setInvitees ] = useState(new Set());

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const addInvitee = useCallback((user) => {
    setInvitees((invitees) => new Set(invitees).add(user));
  }, [invitees]);

  const removeInvitee = useCallback((user) => {
    setInvitees((invitees) => {
      const next = new Set(invitees);
      next.delete(user);
      return next;
    });
  }, [invitees]);

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

  
  const renderHeaderRightInboxIcon = (props) => (
      <InboxIcon {...props} />
  );

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

  if (showBottomSheetModal) {
    handlePresentModalPress();
  }

  const renderFriendListEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <Spinner />
        </View>
      )
    }

    return (
      <Layout level='4' style={styles.layout}>
        <EmptyStateActionButton 
            style={styles.emptyStateActionButton}
            title='Her var det tomt...'
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

        <FriendsOverview 
          friends={friends}
          onAdd={addInvitee}
          onRemove={removeInvitee}
          onRefresh={refetch}
          refreshing={networkStatus === NetworkStatus.refetch}
          ListEmptyComponent={renderFriendListEmptyComponent}
        />
      </Layout>
      
      <InitiateBreakBottomSheet 
          invitees={invitees}
          location={user?.me.preferredLocation}
          onCompleted={() => setInvitees(new Set())}
          bottomSheetModalRef={bottomSheetModalRef}
          friends={friends}
          onAdd={addInvitee}
          onRemove={removeInvitee}
          ListEmptyComponent={renderFriendListEmptyComponent}
      />

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
  layout: {
    flex:1,
    paddingVertical: 90,
  },
  visual: {
    alignSelf: 'center',
    width: win.width * .7,
    height: 30 + '%',
    padding: 15,
  },
});

export default HomeScreen;