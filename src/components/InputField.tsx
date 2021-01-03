import React from 'react'
import { Input, Text, StyleService, useStyleSheet } from '@ui-kitten/components';

export default (props): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);

    return (
    <>
        <Input style={styles.input} {...props} />
        {!!props.error && <Text status='danger'>{props.error}</Text>}
    </>
)}

const themedStyles = StyleService.create({
    input: {
        marginTop: 16,
    }
});
