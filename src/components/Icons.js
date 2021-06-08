import React from 'react';
import { Image } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';

export const TabIcon = ({ name }) => {
  if (name === 'home') {
    return (
      <Image
        source={require('../../images/icons/home.png')}
        style={{ width: 25, height: 25 }}
      />
    );
  } else if (name === 'notifications') {
    return (
      <Image
        source={require('../../images/icons/notifications.png')}
        style={{ width: 25, height: 25 }}
      />
    );
  } else if (name === 'friends') {
    return (
      <Image
        source={require('../../images/icons/friends.png')}
        style={{ width: 35, height: 35 }}
      />
    );
  }
};

export const PinIcon = () => {
  const theme = useTheme();
  return (
    <Icon
      width={16}
      height={16}
      fill={theme['text-basic-color']}
      name='pin'
    />
  );
};

export const PersonAddIcon = (style) => (
  <Icon {...style} name='person-add'/>
);

export const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const MenuIcon = (style) => (
  <Icon {...style} name='menu' />
);