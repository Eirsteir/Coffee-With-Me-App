import React, { useMemo } from 'react';
import { Layout, List, Spinner, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';

import { usePendingBreakInvitations } from '../hooks/Breaks';
import EmptyStateActionButton from '../components/EmptyStateActionButton';
import TopNavigation from '../components/TopNavigation';
import BreakInvitationCard from '../components/BreakInvitationCard';

const InboxScreen = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);

    const { loading, error, data } = usePendingBreakInvitations();
    const invitations = useMemo(() => data !== undefined ? data.pendingBreakInvitations.edges.map(edge => edge.node) : [], [data]);


    const onItemPress = () => {
        navigation && navigation.navigate('Chat1');
    };

    const renderInvitations = ({ item }) => (
        <BreakInvitationCard 
            style={styles.item}
            invitation={item}
            onPress={onItemPress}
        />
    );

    return (
        <React.Fragment>
            <TopNavigation 
                title='Invitasjoner' 
                showBackAction
            />
                {loading && <Spinner size='tiny' status='basic'/>}

                    <List 
                        data={invitations}
                        renderItem={renderInvitations}
                        style={styles.list}
                        keyExtractor={(item) => `item-${item.id}`}
                    />
                    { (!data && !loading) && (
                        <Layout level='3' style={styles.list}>
                            <EmptyStateActionButton 
                                title='Du har ingen nye invitasjoner'
                                buttonText='Start en pause'
                                hint='Trykk på knappen for å planlegge en pause'
                                onPress={() => navigation.navigate("Home", { showBottomSheetModal: true })}
                            />
                        </Layout>
                    )
                }
                
        </React.Fragment>
    );
}

const themedStyles = StyleService.create({
    list: {
      flex: 1,
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: 'background-basic-color-3',
    },
});

export default InboxScreen;