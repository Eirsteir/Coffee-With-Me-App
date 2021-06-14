import React from 'react';
import { Layout, List, Text } from '@ui-kitten/components';

import { usePendingBreakInvitations } from '../hooks/Breaks';
import EmptyStateActionButton from '../components/EmptyStateActionButton';
import TopNavigation from '../components/TopNavigation';


const InboxScreen = ({ navigation }) => {
    const { loading, error, data } = usePendingBreakInvitations();

    const renderInvitations = ({ item }) => (
        <View></View>
    );

    return (
        <React.Fragment>
            <TopNavigation 
                title='Invitasjoner' 
                showBackAction
            />
            { data !== undefined ? (
                <Layout level='1'>
                    <List 
                        data={data}
                        renderItem={renderInvitations}
                        keyExtractor={(item) => `item-${item.id}`}
                    />
                </Layout>
                ) : (
                    <EmptyStateActionButton 
                        title='Du har ingen nye invitasjoner'
                        buttonText='Start en pause'
                        hint='Trykk på knappen for å planlegge en pause '
                        onPress={() => navigation.navigate("Home", { showBottomSheetModal: true })}
                    />
                )
            }
        </React.Fragment>
    );
}

export default InboxScreen;