import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, useTheme } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from '../components/Button';
import LargeHeading from '../components/LargeHeading';

const InitiateBreakScreen = ({ navigation }) => {
    const theme = useTheme();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const showTimepicker = () => {
        setShow(true);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };    

    return (
        <Modal
        style={[styles.modal, { backgroundColor: theme['color-basic-100'] }]}
        visible={true}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => navigation.goBack()}>
            <LargeHeading>Start en pause</LargeHeading>
            <View>
                <Button onPress={showTimepicker} children="Show time picker!" />
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='time'
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
            <Button styling={styles.button} onPress={() => navigation.goBack()}>
                Inviter
            </Button>
    </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        borderRadius: 8,
        padding: 15,
        position: 'absolute', 
        width: "100%",
        top: "35%",
        height: "70%", 
    },
    button: {
        margin: 15,
    },
});

export default InitiateBreakScreen;