import React, { useMemo, useState, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Modal, useTheme } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';

import Button from '../components/Button';
import LargeHeading from '../components/LargeHeading';


const InitiateBreakScreen = ({ bottomSheetModalRef }) => {
    const theme = useTheme();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const snapPoints = useMemo(() => ['65%', '100%'], []);

    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
      }, []);

    const renderContent = () => (
        <View style={styles.container}>
            <LargeHeading>Start en pause</LargeHeading>
            <View>
                <Text>Når?</Text>
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='time'
                is24Hour={true}
                display="default"
                onChange={setDate}
                />
            </View>
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
            onChange={handleSheetChanges}
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
        paddingLeft: 15,
        paddingRight: 15,
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
    }
});

export default InitiateBreakScreen;