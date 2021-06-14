import React, { useMemo, useCallback, useContext } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop
  } from '@gorhom/bottom-sheet';
import { Menu, MenuItem, Layout, Text, StyleService, Divider } from '@ui-kitten/components';
import { useLogout } from '../../hooks/User';
import { AuthContext } from "../../App";
import { useApolloClient } from '@apollo/client';
import { LockIcon, LogoutIcon, NavigationIcon, PersonAddIcon, SettingsIcon } from '../Icons';

const SettingsBottomModal = ({ bottomSheetModalRef }) => {
    const snapPoints = useMemo(() => ['35%'], []);
    const { logout } = useContext(AuthContext);
    const client = useApolloClient();
    const signOutUser = useLogout(client); 

    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close();
      }, []);


    const renderMenu = () => (
        <Menu style={styles.menu}>
            <MenuItem title='Instillinger' accessoryLeft={SettingsIcon} onPress={onSettingsPress}/>
            <MenuItem title='Endre passord' accessoryLeft={LockIcon} onPress={onChangePasswordPress}/>
            <MenuItem title='Nære venner' accessoryLeft={NavigationIcon} onPress={onCloseFriendsPress}/>
            <MenuItem title='Finn venner' accessoryLeft={PersonAddIcon} onPress={onFindFriendsPress}/>
            <MenuItem title='Logg ut' accessoryLeft={LogoutIcon} onPress={onLogoutPress}/>
        </Menu>
    );
    
    const onSettingsPress = ({ index }) => {

    };

    const onChangePasswordPress = ({ index }) => {

    };

    const onCloseFriendsPress = ({ index }) => {

    };

    const onFindFriendsPress = ({ index }) => {

    };

    const onLogoutPress = ({ index }) => {
        signOutUser();
        logout();
    };

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onDismiss={handleClosePress}
                backdropComponent={BottomSheetBackdrop}
                backgroundComponent={({ style, animatedIndex}) => <Layout level='1' style={style} />}
            >
                {renderMenu()}
            </BottomSheetModal>
      </BottomSheetModalProvider>
    )
}


const styles = StyleService.create({
    container: {
      flex: 1,
    },
    menu: {
        flex: 1,
        // margin: 8,
      },
});

export default SettingsBottomModal;