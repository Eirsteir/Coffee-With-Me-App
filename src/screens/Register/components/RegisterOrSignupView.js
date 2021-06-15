import React from 'react';
import { View } from 'react-native';
import { Divider, Text, StyleService, useStyleSheet } from "@ui-kitten/components"

const RegisterOrSignupView = ({ questionText, actionText, onPress}) => {
    const styles = useStyleSheet(themedStyles);

    return (
        <View style={styles.container}>
      
        <Divider style={styles.divider}/>

        <View style={styles.textContainer}>
          <Text 
            style={styles.questionText} 
            appearance='hint' 
            category='c2'
            >
                {questionText}
            </Text>        
            <Text 
                status='info' 
                category='c2' 
                onPress={onPress}
            >
                {actionText}
            </Text>
        </View>
      </View>
    )
}

const themedStyles = StyleService.create({
    container: { 
        flex: 1, 
        justifyContent: 'flex-end', 
        alignItems: 'center' 
    },
    divider: {
        alignSelf: 'stretch'
    },
    textContainer: { 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    questionText: {
        marginVertical: 12,
        marginHorizontal: 3,
        paddingVertical: 20
      },
});

export default RegisterOrSignupView;