// @flow

import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, UploadImage } from 'expo-activity-feed';
import { StreamApp } from 'expo-activity-feed';

import { UserContext } from '../context/UserContext';
import FormField from './FormField';
import CoverImage from './CoverImage';
import type { UserData } from '../types';

type Props = {|
  registerSave: (saveFunc: () => any) => void,
|};

export default function EditProfileForm(props: Props) {
  return (
    <UserContext.Consumer>
      {(userCtx) => <EditProfileFormInner {...props} {...userCtx} />}
    </UserContext.Consumer>
  );
}

type PropsInner = {| ...Props, ...UserContext |};

type State = UserData;

class EditProfileFormInner extends React.Component<PropsInner, State> {
  constructor(props: PropsInner) {
    super(props);
    console.log(props);
    this.state = { ...props.profile() };
    console.log(props.profile());
    
  }

  componentDidMount() {
    this.props.registerSave(async () => {
      await this.props.user.update(this.state);
      this.props.changedUserData();
    });
  }

  _onUploadButtonPress() {
    console.log('onUploadButtonPress');
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <CoverImage source={this.state.coverImage} size={150} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingRight: 15,
            paddingLeft: 15,
            height: 200,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 100 + '%',
            }}
          >
            <Avatar
              source={this.state.profileImage}
              size={100}
              editButton
              onUploadButtonPress={this._onUploadButtonPress}
            />
            <UploadImage onUploadButtonPress={this._onUploadButtonPress} />
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <FormField
            value={this.state.name}
            label={'Name'}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <FormField
            value={this.state.url}
            label={'Website'}
            onChangeText={(text) => this.setState({ url: text })}
          />
          <FormField
            value={this.state.desc}
            label={'Description'}
            onChangeText={(text) => this.setState({ desc: text })}
            multiline
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
