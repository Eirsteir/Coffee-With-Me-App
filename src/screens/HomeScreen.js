// @flow
import React, { useLayoutEffect } from 'react';
import { 
  Text, 
  TouchableOpacity,
  View, 
  StyleSheet,
} from 'react-native';
import { Avatar } from 'expo-activity-feed';
import { Icon, ButtonGroup, Layout } from '@ui-kitten/components';
import AddFriendsHeader from '../components/AddFriendsHeader';

import LargeHeading from '../components/LargeHeading';
import { useCurrentUser } from '../hooks/User';
import Button from '../components/Button';
import { isNonEmptyArray } from '@apollo/client/utilities';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const HomeScreen = ({ navigation }) =>  {
  const { loading, error, data: user } = useCurrentUser();

  useLayoutEffect(() => {

    navigation.setOptions({
      title: 'Coffee with me',
      headerTitleStyle: { alignSelf: 'center' },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ paddingLeft: 15 }}
        >
          <Avatar
            source={(userData) => userData.data.profileImage}
            size={23}
            noShadow
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <AddFriendsHeader navigation={navigation} /> 
      ),
    })
  }, [navigation]);

  return (
    <Layout style={styles.container} level='1'>
        {user && <LargeHeading>Hei, {user.me.name.split(" ")[0]}</LargeHeading>}
        <Text style={styles.text} category='s1'>På tide med en pause? Inviter noen nå</Text>

        <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='danger'>
          <Button style={styles.button} accessoryLeft={StarIcon}/>
          <Button style={styles.button} accessoryLeft={StarIcon}/>
          <Button style={styles.button} accessoryLeft={StarIcon}/>
        </ButtonGroup>

        <LargeHeading>Venneoversikt</LargeHeading>

      </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  button: {
    margin: 10,
  },
  buttonGroup: {
    margin: 2,
    justifyContent: 'center',
  },
  text: {
    margin: 2,
    marginTop: 15,
    paddingLeft: 15,
  },
});

export default HomeScreen;