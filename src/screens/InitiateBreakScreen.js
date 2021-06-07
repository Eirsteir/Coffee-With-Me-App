import React, { useMemo, useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';

  import moment from 'moment';
import localization from 'moment/locale/nb';

import Button from '../components/Button';
import LargeHeading from '../components/LargeHeading';

const now = new Date();
now.setMinutes(now.getMinutes() + 15);

const InitiateBreakScreen = ({ bottomSheetModalRef }) => {
    const [time, setTime] = useState(now);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const snapPoints = useMemo(() => ['65%', '100%'], []);

    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close();
      }, []);

    moment.updateLocale("nb", localization);
    const startingInMinutes = moment().to(time);

    const renderContent = () => (
        <View style={styles.container}>

            <LargeHeading>Start en pause</LargeHeading>
            
            <View style={styles.startTimeContainer}>
                <Text>
                    Pausen vil starte {startingInMinutes}.
                </Text>
                <View style={styles.changeStartTimeHint}>
                    <TouchableOpacity onPress={setShowTimePicker}> 
                        <Text appearance='hint'>Endre</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {showTimePicker && (
                <View style={styles.datePickerContainer}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode='time'
                        is24Hour={true}
                        display="inline"
                        onChange={(event, date) => setTime(date)}
                        style={styles.datePicker}
                    />
                    <TouchableOpacity onPress={() => setShowTimePicker(false)}> 
                        <Text appearance='hint'>Ferdig</Text>
                    </TouchableOpacity>
                </View>
                )}
            
            <Button styling={styles.button} onPress={handleClosePress}>
                Inviter
            </Button>
        </View>
    )

    return (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.backDrop}
          >
            {renderContent()}
          </BottomSheetModal>
      </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        margin: 10,
    },
    backDrop: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    // This only works on iOS
    datePicker: {
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerContainer: { 
        flexDirection: 'column',
        alignItems: 'center',
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
    }
});

export default InitiateBreakScreen;