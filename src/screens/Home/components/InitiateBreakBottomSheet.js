import React, { useMemo, useState, useCallback } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Layout, Text, Spinner, StyleService, useStyleSheet } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetScrollView
  } from '@gorhom/bottom-sheet';

import moment from 'moment';
import localization from 'moment/locale/nb';

import Button from '../../../components/Button';
import LargeHeading from '../../../components/LargeHeading';
import { ClockIcon, FriendsIcon, PinIcon } from '../../../components/Icons';
import LocationSelect from '../../Register/components/LocationSelect';

import { useIniateBreak } from '../../../hooks/Breaks';

import { InitiateBreakParameterCard } from './InitiateBreakParameterCard';
import FriendsOverview from './FriendsOverview';
import { useLocations } from '../../../hooks/Location';



const InitiateBreakBottomSheet = ({ invitees, location: initialLocation, bottomSheetModalRef, ...friendsOverViewProps }) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const [time, setTime] = useState(now);

    const styles = useStyleSheet(themedStyles);
    const navigation = useNavigation();
    const [location, setLocation] = useState(initialLocation);
    const { loading: locationsLoading, error: locationsError, data: locationsData } = useLocations();
    const locations = useMemo(() => (locationsData !== undefined ? locationsData.locations.edges.map((edge) => edge.node) : []), [locationsData]);
  
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showFriendsOverview, setShowFriendsOverview] = useState(false);
    const [showLocationSelect, setShowLocationSelect] = useState(false);

    const snapPoints = useMemo(() => ['75%', '100%'], []);
    const [initiateBreak, { loading, data }] = useIniateBreak({
        variables: {
            addressees: [...invitees].map(user => user.uuid),
            startTime: time
        },
        onCompleted: () => {
            Alert.alert("Vent på svar og gjør deg klar til pause!");
            handleClosePress();
        },
        onError: err => Alert.alert(err)
    });

    const handleClosePress = useCallback(() => bottomSheetModalRef.current?.close(), [bottomSheetModalRef]);
    const toggleTimePicker = () => setShowTimePicker(!showTimePicker);
    const toggleFriendsOverview = () => setShowFriendsOverview(!showFriendsOverview);
    const toggleLocationSelect = () => setShowLocationSelect(!showLocationSelect);

    moment.updateLocale("nb", localization);
    const startingInMinutes = moment().to(time, true);

    const renderInvitees = () => {
        
        if (invitees !== undefined && invitees.size) { 
            const firstInvitee = invitees.values().next().value;
            const firstInviteeName = firstInvitee.name.split(' ')[0];
            const inviteeLink = () => (
                <Text onPress={() => navigation.push('Default', { screen: 'Profil', params: { screen: 'Profile', params: { userId: firstInvitee.uuid } } })}>
                    {firstInviteeName}
                </Text>
                );
            return (
                    `Du inviterer ${inviteeLink()} ${ invitees.size > 1 && ` og ${invitees.size - 1} andre`}.`
            );
        } else {
            return (
                "Ingen"
            );
        }
    }    

    
    const renderDateTimePicker = () => (
        <View style={styles.datePickerContainer}>
            <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode='time'
                is24Hour={true}
                display="inline"
                onChange={(event, date) => setTime(date)}
                style={styles.datePicker} />
            <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <Text appearance='hint'>Ferdig</Text>
            </TouchableOpacity>
        </View>
    );
    
    const onLocationSelectionCompleted = (location) => {
        setLocation(location);
    }

    const renderLocation = () => {
        if (location) {
            return location.title
        } 
        return "Velg sted";
    }

    const renderLocationSelect = () => (
        <LocationSelect
            locations={locations} 
            loading={locationsLoading} 
            error={locationsError}
            onSelectionCompleted={onLocationSelectionCompleted} 
            style={styles.locationSelect}
        />
    )
    

    const renderContent = () => (
        <BottomSheetScrollView contentContainerStyle={styles.container}>

            <LargeHeading>Start en pause</LargeHeading>

            <View style={styles.profileParametersContainer}>
                <View style={styles.profileParametersSection}>
                    <InitiateBreakParameterCard
                        style={styles.profileParameter}
                        hint='Starter om'
                        value={startingInMinutes}
                        icon={ClockIcon}
                        onPress={toggleTimePicker}
                    />

                    {showTimePicker && renderDateTimePicker()}

                    <InitiateBreakParameterCard
                        style={styles.profileParameter}
                        hint='Du inviterer'
                        value={renderInvitees()}
                        icon={FriendsIcon}
                        onPress={toggleFriendsOverview}
                    />

                    {showFriendsOverview && <FriendsOverview {...friendsOverViewProps} />}

                    
                    <InitiateBreakParameterCard
                        style={styles.profileParameter}
                        hint='Sted'
                        value={renderLocation()}
                        icon={PinIcon}
                        onPress={toggleLocationSelect}
                    />

                    {showLocationSelect && renderLocationSelect()}
                </View>
            </View>

                
            <Button styling={styles.button} onPress={() => initiateBreak()} size='medium'>
                {loading ? <Spinner size='tiny' status='basic'/> : 'Inviter'}
            </Button>
            </BottomSheetScrollView>
    )

    return (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={BottomSheetBackdrop}
            backgroundComponent={({ style, animatedIndex}) => <Layout level='1' style={style} />}
          >
            {renderContent()}
          </BottomSheetModal>
      </BottomSheetModalProvider>
    );
}

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'background-basic-color-1',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        margin: 10,
    },
    // This only works on iOS
    datePicker: {
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerContainer: { 
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    startTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexWrap : 'wrap',
    },
    changeStartTimeHint: { 
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 5
    },
    profileParametersContainer: {
        flexDirection: 'row',
        marginVertical: 24,
        marginHorizontal: 8,
    },
    profileParametersSection: {
        flex: 1,
        marginHorizontal: 16,  
    },
      profileParameter: {
        marginBottom: 16,
    },
    locationSelect: {
        marginTop: 20
    },
});

export default InitiateBreakBottomSheet;

