// @flow
import React from 'react';

import { ListItem, Text } from '@ui-kitten/components';
import moment from 'moment';


export const BreakHistoryItem = ({ break_, onPress, ...listItemProps }) => {
    const participantsCount = break_.participants.count;
    const otherText = participantsCount - 2 >= 1 ? 'andre' : 'annen';

    const subHeader = participantsCount === 2 
        ? ''
        : ` og ${participantsCount - 2} ${otherText}`;

    const title = () => (
        <Text category='p2'>
            {'Du tok en pause med '}
            <Text category='p2'>
                {break_.invitation.sender.name.split(" ")[0]}
            </Text>
            {subHeader}
        </Text>
    );

    const description = () => <Text category='c2' appearance='hint'>{moment().to(break_.startingAt)}</Text>;

    return (
        <ListItem
        {...listItemProps}
        onPress={onPress}
        title={title}
        description={description}
        />
    );
};

export default BreakHistoryItem;
