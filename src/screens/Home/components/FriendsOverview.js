// @flow
import React from 'react';
import { List, } from '@ui-kitten/components';

import UserStatusCard from '../../../components/UserStatusCard';

const FriendsOverview = ({friends, onAdd, onRemove, ListEmptyComponent}) => {
    return (
      <List
        data={friends}
        renderItem={({ item }) => (
          <UserStatusCard
            user={item}
            currentStatus={item.currentStatus}
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item)} />
        )}
        keyExtractor={(item) => `item-${item.id}`}
        ListEmptyComponent={ListEmptyComponent} />
  );
}

export default FriendsOverview;