// @flow

import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar } from 'expo-activity-feed';

import { UserContext } from '../context/UserContext';
import UniversityService from '../api/services/UniversityService';
import FormField from './FormField';
import CoverImage from './CoverImage';
import type { UserData } from '../types';
import AutocompleteField from '../components/AutocompleteField';


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

const universityData = [
  {
    id: 1,
    name: 'NTNU', 
  },
  {
    id: 2,
    name: 'NHH',
  },
  {
    id: 3,
    name: 'Handelshøyskolen BI'
  },
  {
    id: 4,
    name: 'OsloMet'
  }
]

class EditProfileFormInner extends React.Component<PropsInner, State> {

  constructor(props: PropsInner) {
    super(props);
    let profile = props.profile();
    this.state = { 
      nickname: profile.nickname,
      university: profile.university,
      universitiesData: null,
    };        
  }

  componentDidMount() {
    this.loadUniversities();
    this.props.registerSave(async () => {
      return await this.props.update({ nickname: this.state.nickname, universityId: this.state.university.id })
        .then(this.props.successCallback)
        .catch(this.props.errorCallback);
    });
  }

  _onUploadButtonPress() {
    console.log('onUploadButtonPress');
  }

  loadUniversities = () => {
    return UniversityService.fetchUniversities(false)
      .then(async (universitiesData) => {
        this.setState({ universitiesData })
      });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
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
            placeholder={this.state.nickname}
            label={'Nickname'}
            onChangeText={(text) => this.setState({ nickname: text })}
          />
          <AutocompleteField 
            label='University'
            placeholder={this.state.university.name}
            onPressCallback={(item) => this.setState({ university: item })}
            data={this.state.universitiesData}
          /> 
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
