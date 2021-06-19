import React, { useMemo } from 'react';
import { Layout, List, Spinner, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';

import { usePendingBreakInvitations } from '../hooks/Breaks';
import EmptyStateActionButton from '../components/EmptyStateActionButton';
import TopNavigation from '../components/TopNavigation';
import BreakInvitationCard from '../components/BreakInvitationCard';
import { NetworkStatus } from '@apollo/client';

const InboxScreen = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);

    const { loading, error, data, fetchMore, refetch, networkStatus } = usePendingBreakInvitations({
        variables: {
            first: 10
        }
    });
    const invitations = useMemo(() => (data !== undefined ? data.pendingBreakInvitations.edges.map(edge => edge.node) : []), [data]);
    const refreshing = networkStatus === NetworkStatus.refetch

    const onItemPress = () => {
        navigation && navigation.navigate('');
    };

    const renderInvitations = ({ item }) => (
        <BreakInvitationCard 
            style={styles.item}
            invitation={item}
            onPress={onItemPress}
        />
    );
    
    const renderLoading = () => (
        <View style={styles.loading}>
          <Spinner/>
        </View>  
    );

    const handleOnEndReached = () => {
        if (data.pendingBreakInvitations.pageInfo.hasNextPage && !loading)
          return fetchMore({
            variables: {
              after: data.pendingBreakInvitations.pageInfo.endCursor,
              first: 5,
            },
            updateQuery: onUpdate,
          })
      }

      const onUpdate = (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.pendingBreakInvitations.count === 0) 
            return prev

        const { pageInfo } = fetchMoreResult.pendingBreakInvitations
        const edges = [
          ...prev.pendingBreakInvitations.edges,
          ...fetchMoreResult.pendingBreakInvitations.edges,
        ]
        return Object.assign({}, prev, {
            pendingBreakInvitations: {
              __typename: prev.pendingBreakInvitations.__typename,
              pageInfo,
              edges
          },
        })
      }

    const renderInvitationsList = () => (
        <List 
            data={invitations}
            renderItem={renderInvitations}
            keyExtractor={(item) => `item-${item.id}`}
            onRefresh={refetch}
            refreshing={refreshing}
            onEndReachedThreshold={0.5}
            onEndReached={handleOnEndReached}
            contentContainerStyle={{ flexGrow: 1 }}
        />
    );

    const renderInvitationsEmpty = () => (
        <Layout level='3' style={styles.list}>
            <EmptyStateActionButton 
                title='Du har ingen nye invitasjoner'
                buttonText='Start en pause'
                hint='Trykk på knappen for å planlegge en pause'
                onPress={() => navigation.navigate("Home", { showBottomSheetModal: true })}
            />
        </Layout>
    );

    const renderContent = () => {
        if (loading && invitations.length === 0) 
            return renderLoading();
        else if (invitations.length) 
            return renderInvitationsList();
        else 
            return renderInvitationsEmpty();
    }

    return (
        <React.Fragment>
            <TopNavigation 
                title='Invitasjoner' 
                showBackAction
            />
            {renderContent()}

        </React.Fragment>
    );
}

const themedStyles = StyleService.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: 'background-basic-color-3',
    },
});

export default InboxScreen;