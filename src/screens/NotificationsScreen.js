//@flow
import React, { useLayoutEffect } from 'react';
import { Image, View } from 'react-native';

import { NotificationFeed } from 'expo-activity-feed';
import { Activity, LikeButton, ReactionIcon } from 'expo-activity-feed';

import Notification from '../components/Notification';
import Follow from '../components/Notifications/Follow';
import AddFriendsHeader from '../components/AddFriendsHeader';

import CategoriesIcon from '../../images/icons/categories.png';
import ReplyIcon from '../../images/icons/reply.png';


export default function({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Aktivitet',
      headerShown: true,
      headerLeft: () => (
        <View style={{ paddingLeft: 15 }}>
          <Image source={CategoriesIcon} style={{ width: 23, height: 23 }} />
        </View>
      ),
      headerRight: () => (
        <AddFriendsHeader navigation={navigation} /> 
      ),
      headerTitleStyle: {
        fontWeight: '500',
        alignSelf: "center"
      },
    });
  }, [navigation]);

  const _renderGroup = ({ activityGroup, styles, ...props }: any) => {
    let verb = activityGroup.activities[0].verb;
    if (verb === 'follow') {
      return <Follow activities={activityGroup.activities} styles={styles} />;
    } else if (verb === 'heart' || verb === 'repost') {
      return (
        <Notification activities={activityGroup.activities} styles={styles} />
      );
    } else {
      let activity = activityGroup.activities[0];
      return (
        <Activity
          activity={activity}
          {...props}
          Footer={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LikeButton activity={activity} {...props} />

              <ReactionIcon
                icon={ReplyIcon}
                labelSingle="comment"
                labelPlural="comments"
                counts={activityGroup.activities.reaction_counts}
                kind="comment"
              />
            </View>
          }
        />
      );
    }
  };

  return (
    <NotificationFeed
      Group={_renderGroup}
      navigation={navigation}
      notify
    />
  );
}
