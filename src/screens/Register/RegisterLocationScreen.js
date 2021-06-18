import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/extra/3rd-party';

import RegisterOrSignupView from './components/RegisterOrSignupView';
import LocationSelect from './components/LocationSelect';
import { useLocations } from '../../hooks/Location';


const RegisterLocationScreen = ({ route, navigation }) => {
  const [location, setLocation] = useState();
  const [locationSelectError, setLocationError] = useState(''); 
  const { loading, error, data } = useLocations();
  const styles = useStyleSheet(themedStyles);
  const locations = useMemo(() => (data !== undefined ? data.locations.edges.map((edge) => edge.node) : []), [data]);
  console.log(locations)
  const onNextButtonPress = () => { 
      if (location)
          navigation.navigate('RegisterUsername', { location, ...route.params });
      else {
        setLocationError("Velg et studiested eller hopp over");
      }
  };

  const onSkipButtonPress = () => {
    navigation.navigate('RegisterUsername', { location, ...route.params });
  }

  const onSelectionCompleted = (location) => {
    setLocation(location);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text 
                style={styles.header}
                category="h5">
                    Legg til studiested
                </Text>
                <Text 
                    appearance='hint' 
                    category='c2'
                    style={styles.subHeader}
                >
                    Legg til ditt studiested, slik at venner vet hvor de kan finne deg
                </Text>
            </View>
            <View style={styles.formContainer}>
              <LocationSelect 
                locations={locations} 
                loading={loading} 
                error={locationSelectError}
                onSelectionCompleted={onSelectionCompleted} 
                style={styles.locationSelect}
                />
            </View>

            <Button
                style={styles.button}
                disabled={!location}
                onPress={onNextButtonPress}>
                Neste
            </Button>
            <Button
                style={styles.button}
                appearance='ghost'
                onPress={onSkipButtonPress}>
                Hopp over
            </Button>
        </SafeAreaView>

        <RegisterOrSignupView 
            questionText='Har du allerede en konto?'
            actionText='Logg inn.'
            onPress={() => navigation.navigate("SignIn")}
        />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  header: {
    marginTop: 40,
    marginBottom: 10
  },
  subHeader:  {
    paddingHorizontal: 32,
  },
  formContainer: {
    paddingHorizontal: 32,
  },
  locationSelect: {
    marginTop: 20
  },
  button: {
    marginHorizontal: 32,
    marginTop: 20
  },
});

export default RegisterLocationScreen;