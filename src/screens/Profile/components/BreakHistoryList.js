import React from 'react';
import { View } from 'react-native';
import { List, StyleService, Text, Layout, useStyleSheet, Spinner  } from '@ui-kitten/components';
import BreakHistoryItem from './BreakHistoryItem';
import EmptyStateActionButton from '../../../components/EmptyStateActionButton';
import { useNavigation } from '@react-navigation/native';

const BreakHistoryList = ({ data, loading, error, ...listProps }) => {
    const styles = useStyleSheet(themedStyles);
    const navigation = useNavigation();

    const renderBreak = ({ item }) => (
        <BreakHistoryItem 
            break_={item} 
            style={styles.item}    
            onPress={onItemPress}
        />
    )

    const onItemPress = () => {
        navigation && navigation.navigate('');
    };

    const renderLoading = () => (
        <View style={styles.loading}>
          <Spinner/>
        </View>  
    );

    const renderError = () => (
        <View style={styles.loading}>
            <Text>Vi beklager, men noe gikk galt. Prøv igjen senere.</Text>
        </View>
    )

    const renderBreakHistoryList = () => (
        <List 
            data={data}
            renderItem={renderBreak}
            keyExtractor={(item) => `item-${item.id}`}
            ListEmptyComponent={renderBreakHistoryEmpty}
            {...listProps}
        />
    );

    const renderBreakHistoryEmpty = () => (
        <Layout level='4' style={styles.layout}>
            <EmptyStateActionButton 
                style={styles.emptyStateActionButton}
                title='Du har ikke tatt noen pauser enda'
                buttonText='Start en pause'
                hint='Ta et avbrekk og inviter noen venner'
                onPress={() => navigation.navigate("Home", { showBottomSheetModal: true })}
            />
        </Layout>
    );

    if (loading)     
        return renderLoading();
    else if (error) 
        renderError();
    return renderBreakHistoryList();
}

const themedStyles = StyleService.create({
    layout: {
        flex:1,
       paddingVertical: 50
    },
    item: {
        paddingHorizontal: 15,  
        borderBottomWidth: 1,
        borderBottomColor: 'background-basic-color-3',
    },
});

export default BreakHistoryList;