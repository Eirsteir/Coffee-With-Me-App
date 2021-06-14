import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import Button from './Button';

const EmptyStateActionButton = ({title, hint, buttonText, onPress}) => (
    <Layout style={styles.container} level='4'>
        <Text category='h6'>{title}</Text>
        <Text appearance='hint' style={styles.text}>{hint}</Text>
        <Button 
            styling={styles.button}
            onPress={onPress} 
            children={buttonText}
        />
    </Layout>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 15,
    },
    text: {
        marginTop: 5,
    }
});  

export default EmptyStateActionButton;