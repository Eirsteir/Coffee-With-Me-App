// @flow
import React from 'react';
import { List, } from '@ui-kitten/components';

import UserStatusCard from '../../../components/UserStatusCard';

const FriendsOverview = ({friends, addInvitee, removeInvitee, ListEmptyComponent}) => {
    return (
      <List
        data={friends}
        renderItem={({ item }) => (
          <UserStatusCard
            user={item}
            currentStatus={item.currentStatus}
            onAdd={() => addInvitee(item)}
            onRemove={() => removeInvitee(item)} />
        )}
        keyExtractor={(item) => `item-${item.id}`}
        ListEmptyComponent={ListEmptyComponent} />
  );
}

export default FriendsOverview;