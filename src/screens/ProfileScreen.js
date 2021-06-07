import React, { useMemo } from 'react';
import { ListRenderItemInfo, ScrollView, View } from 'react-native';
import { List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Avatar } from 'expo-activity-feed';

import { ProfileSocial } from '../components/Profile/ProfileSocial';
import FriendActionButton from '../components/FriendActionButton';
import { PinIcon } from '../components/Icons';
import { useUser } from '../hooks/User';

const ProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const { data: user, loading, error } = useUser(userId);
  const profile = useMemo(() => user !== undefined ? (user.hasOwnProperty("me") ? user.me : user.user) : null);
  const friends = useMemo(() => (profile !== undefined ? profile.friends.edges.map((edge) => edge.node) : []), [profile]);
  const styles = useStyleSheet(themedStyle);

  const renderFriendItem = (info) => (
    <View style={styles.friendItem}>
      <Avatar source={info.item.profilePic}/>
      <Text
        style={styles.friendName}
        category='c2'>
        {info.item.name}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View
        style={styles.header}
        >
        {/* TODO: UI-kitten avatar with default image */}
        <Avatar
          styles={styles.profileAvatar}
          source={profile.profilePic}
          size={124}
          noShadow
        />
        <Text
          style={styles.profileName}
          category='h5'>
          {profile.name}
        </Text>
        <View style={styles.locationContainer}>
          <PinIcon/>
          <Text
            style={styles.location}>
            {profile.location || "NTNU"}
          </Text>
        </View>
        { user.uuid !== userId && (
          <View style={styles.profileButtonsContainer}>
            <FriendActionButton
              user={profile}
              currentUser={user.me}
              isFriend={profile.isViewerFriend}
              friendshipStatus={profile.friendshipStatus}
              style={styles.profileButton}
            />
          </View>
        )}
        <View style={styles.socialsContainer}>
          <ProfileSocial
            style={styles.profileSocial}
            hint='Followers'
            value={`${profile.followers || 0}`}
          />
          <ProfileSocial
            style={styles.profileSocial}
            hint='Following'
            value={`${profile.following || 0}`}
          />
          <ProfileSocial
            style={styles.profileSocial}
            hint='Pauser' // TODO: eller venner
            value={`${profile.breaks || 0 }`}
          />
        </View>
      </View>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Om
      </Text>
      <Text
        style={styles.profileDescription}
        appearance='hint'>
        {profile.description}
      </Text>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Venner
      </Text>
      <List
        contentContainerStyle={styles.friendsList}
        horizontal={true}
        data={friends}
        renderItem={renderFriendItem}
      />
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Historie
      </Text>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
  },
  profileName: {
    zIndex: 1,
    marginTop: 16
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: 'row',
    width: '75%',
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileDescription: {
    marginHorizontal: 16,
  },
  friendsList: {
    marginHorizontal: 8,
  },
  friendItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  friendName: {
    marginTop: 8,
  }
});

export default ProfileScreen;