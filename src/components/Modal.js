import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

export const ErrorModal = (props) => {

  const [visible, setVisible] = React.useState(true);

  return (
    <Modal
    visible={visible}
    backdropStyle={styles.backdrop}
    onBackdropPress={() => setVisible(false)}>
    <Card 
    disabled={true}
    style={styles.container}>
        <Text>{props.title}</Text>
        <Button 
        style={styles.button}
        appearance='ghost'
        onPress={() => setVisible(false)}>
        OK
        </Button>
    </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#8F9BB3',
  },
  button: {
    marginTop: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});