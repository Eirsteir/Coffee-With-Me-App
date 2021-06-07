import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const EmailIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='email'/>
);

export const EyeIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye'/>
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye-off'/>
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person'/>
);

export const LockIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='lock-outline'/>
);

export const FacebookIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='facebook'/>
  );
  
  export const GoogleIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='google'/>
  );
  
  export const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );

  export const PlusIcon = (props) => (
    <Icon {...props} name='plus' />
  )