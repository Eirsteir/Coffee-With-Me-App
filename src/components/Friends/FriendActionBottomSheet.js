import React, { useMemo, useState, useCallback } from 'react';
import { Layout, Menu, MenuItem, StyleService, useStyleSheet } from '@ui-kitten/components';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
  } from '@gorhom/bottom-sheet';

import LargeHeading from '../LargeHeading';
import { ChevronRight } from '../Icons';
import { useRemoveFriend } from '../../hooks/Friends';
import { Alert } from 'react-native';


const FriendActionBottomSheet = ({  user, bottomSheetModalRef }) => {
    const styles = useStyleSheet(themedStyles);
    const snapPoints = useMemo(() => ['33%', '100%'], []);
    const handleClosePress = useCallback(() => bottomSheetModalRef.current?.close(), [bottomSheetModalRef]);
    const [unfriend, { data, loading, error }] = useRemoveFriend();

    const renderContent = () => (
        <Layout style={styles.container}>

            <LargeHeading style={{alignItems: 'center'}}>{user.username}</LargeHeading>

            <Menu style={styles.menu} scrollEnabled={false}>
                <MenuItem style={styles.menuItem} title='Fjern venn' accessoryRight={ChevronRight} onPress={onRemoveFriendPress}/>
                <MenuItem style={styles.menuItem} title='Slutt å følge' accessoryRight={ChevronRight} onPress={onStopFollowPress}/>
                <MenuItem style={styles.menuItem} title='Legg til i listen over nære venner' accessoryRight={ChevronRight} onPress={() => null}/>
            </Menu>
        </Layout>
    )

    const onRemoveFriendPress = () => {
        unfriend({ 
            variables: { friend: user.uuid }
          }).then(
            res => {
              Alert.alert("Du og " + user.name + " er ikke lenger venner"),
              handleClosePress();
            },
            err => Alert.alert(err)
          );      
    }
    
    const onStopFollowPress = () => {
        
    }

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
        backgroundColor: 'background-basic-color-1',
    },
    menu: {
        backgroundColor: 'background-basic-color-1',
    },
    menuItem: {
        paddingVertical: 20
    }
});

export default FriendActionBottomSheet;

