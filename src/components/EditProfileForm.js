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
    this.state = { ...props.profile() };    
    console.log(this.props);
    
  }

  componentDidMount() {
    this.props.registerSave(async () => {
      return await this.props.update(this.state)
        .then(() => this.props.successCallback())
        .catch(error => {
          this.props.errorCallback(error);
        });
    });
  }

  _onUploadButtonPress() {
    console.log('onUploadButtonPress');
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <CoverImage />
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
              noShadow
            />
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <FormField
            value={this.state.name}
            label={'Name'}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <FormField
            value={this.state.nickname}
            label={'Nickname'}
            onChangeText={(text) => this.setState({ nickname: text })}
          />
          <FormField
            value={this.state.desc}
            label={'University'}
            onChangeText={(text) => this.setState({ university: text })}
            multiline
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
