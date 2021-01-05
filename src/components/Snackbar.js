import React from 'react';
import SnackBar from 'react-native-snackbar-component'

export function ErrorSnackbar(props) {
    return (
        <SnackBar
            backgroundColor='#cc0000' 
            accentColor='#f5f5f5'	
            {...props}
        />
    )
}