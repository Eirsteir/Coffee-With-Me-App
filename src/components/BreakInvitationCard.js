// @flow
import React from 'react';

import { Alert, StyleSheet, View } from 'react-native';
import { Avatar, ListItem, Text, Spinner, useTheme } from '@ui-kitten/components';
import moment from 'moment';
import { CheckMarkIcon, CloseIcon } from './Icons';
import { ThemeContext } from '../theme-context';
import { useAcceptBreakInvitation, useDeclineBreakInvitation } from '../hooks/Breaks';


export const BreakInvitationCard = ({ invitation, onPress, ...listItemProps }) => {
    const theme = useTheme(ThemeContext);
    const [acceptInvitation, { loading: acceptLoading, error: acceptError }] = useAcceptBreakInvitation({ 
        variables: { invitation: invitation.uuid },
        onCompleted: () => Alert.alert("Du har godtatt invitasjonen!", `Pausen starter ${moment().to(invitation.subject.startingAt)}`),
        onError: err => Alert.alert("Noe gikk galt: ", err)
    }, invitation);

    const [declineInvitation, { loading: declineLoading, error: declineError }] = useDeclineBreakInvitation({ 
        variables: { invitation: invitation.uuid },
        onCompleted: () => Alert.alert("Du har ignorert invitasjonen"),
        onError: err => Alert.alert("Noe gikk galt: ", err)
    }, invitation);

  const renderActionIcons = (style) => (
    <View style={styles.dateContainer}>
      <CloseIcon 
        {...style} 
        fill={theme['color-danger-default']} 
        height={42} 
        width={42} 
        onPress={() => declineInvitation()}
        />
      <CheckMarkIcon 
        {...style} 
        fill={theme['color-success-default']} 
        height={42} 
        width={42} 
        onPress={() => acceptInvitation()}/>
    </View>
  );


  const renderProfileAvatar = () => (
    <Avatar
      style={styles.avatar}
      source={invitation.sender.profilePic}
    />
  );

  const otherText = invitation.addresseeCount >= 1 ? 'andre' : 'annen';

  const subHeader = invitation.addresseeCount === 1 
    ? 'deg'
    : `deg og ${invitation.addresseeCount - 1} ${otherText}`;

    const title = () => (
        <Text category='c2'>
            {invitation.sender.name.split(" ")[0]}
            <Text category='c2' appearance='hint'>
                {` vil ta en pause med ${subHeader} ${moment().to(invitation.subject.startingAt)}`}
            </Text>
        </Text>
    );

  return (
    <ListItem
      {...listItemProps}
      onPress={onPress}
      title={title}
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderActionIcons}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    tintColor: null,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
});

export default BreakInvitationCard;
