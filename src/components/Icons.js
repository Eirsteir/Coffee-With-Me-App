import React from 'react';
import { Image } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';
import { IconBadge } from 'expo-activity-feed';

export const HomeIcon = (style) => (
  <Icon {...style} name='home-outline'/>
);

export const FriendsIcon = (style) => (
  <Icon {...style} name='people-outline'/>
);

export const ProfileIcon = (style) => (
  <Icon {...style} name='person-outline' />
);

export const NotificationIcon = (style) => (
  <IconBadge showNumber>
    <Icon {...style} name='bell-outline' />
  </IconBadge>
);

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
  <Icon {...style} name='person-add-outline'/>
);

export const NavigationIcon = (style) => (
  <Icon {...style} name='navigation-2-outline' />
);

export const SettingsIcon = (style) => (
  <Icon {...style} name='settings-outline' />
);

export const LockIcon = (style) => (
  <Icon {...style} name='lock-outline' />
);

export const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const MenuIcon = (style) => (
  <Icon {...style} name='menu' />
);

export const InboxIcon = (props) => (
  <Icon {...props} name='email-outline' />
);

export const PlusIcon = (props) => (
  <Icon {...props} name='plus' />
);

export const MinusIcon = (props) => (
  <Icon {...props} name='minus' />
);

export const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);