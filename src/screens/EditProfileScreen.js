// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, StyleService, Spinner, useStyleSheet, Layout } from '@ui-kitten/components';
import { Avatar } from 'expo-activity-feed';
import { useMutation } from '@apollo/client';

import { UserContext } from '../context/UserContext';
import { ErrorSnackbar } from '../components/Snackbar';
import { ProfileSetting } from '../components/ProfileSetting';
import { KeyboardAvoidingView } from '../components/extra/3rd-party';
import UPDATE_PROFILE_MUTATION from '../graphql/updateProfile.mutation';


export default ({ navigation }) => {

  const { profile, update } = React.useContext(UserContext);
  const user = profile();

  const [name, setName] = React.useState(user.name);
  const [username, setUsername] = React.useState(user.username);
  const [profilePic, setProfilePic] = React.useState(user.profilePic);
  const [errorSnackbarIsVisible, setErrorSnackbarIsVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const [updateProfile, { loading, error }] = useMutation(UPDATE_PROFILE_MUTATION, {
    variables: {
      name: name || '', 
      username: username || '',
      locale: 'nb'
    },
    onCompleted: ({ updateProfile }) => handleUpdateProfileCompleted(updateProfile),
    onError: err => {
      console.error(err);
      return setErrorSnackbarIsVisible(true);
    }    
  });

  const handleUpdateProfileCompleted = updateProfile => {
    console.log(updateProfile);
    // refresh user data
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Rediger profil',
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft
    });
  }, [navigation]);
    
  const _onUploadButtonPress = () => console.log('Uploading profile pic');

  const renderHeaderLeft = (): React.ReactElement => (
    <TouchableOpacity 
    style={{ paddingLeft: 15 }}
    onPress={() => navigation.goBack()}
    >
      <Text>Avbryt</Text>
    </TouchableOpacity>
  );

  const renderHeaderRight = (): React.ReactElement => (
    <TouchableOpacity 
    style={{ paddingRight: 15 }}
    onPress={updateProfile}
    >
      {loading ? <Spinner size='small'/> : <Text>Ferdig</Text>}
    </TouchableOpacity>
  );

  return (
    <Layout style={styles.container} level="1">

      <View style={styles.header}>
        <Avatar
          source={profilePic}
          size={124}
          editButton
          onUploadButtonPress={_onUploadButtonPress}
          noShadow
        />
      </View>
      <View style={styles.formContainer}>
        <ProfileSetting
          style={styles.profileSetting}
          hint='Name'
          value={name ? name : 'Name'}
          onChangeText={setName}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint='Username'
          value={username ? username : 'Username'}
          onChangeText={setUsername}
        />
      </View>
      
      <ErrorSnackbar 
        visible={errorSnackbarIsVisible} 
        textMessage="Unable update, try again later!" 
        actionHandler={() => setErrorSnackbarIsVisible(false) } 
        actionText="Dismiss"
      />
    </Layout>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  profileSetting: {
    padding: 16,
  },
});
