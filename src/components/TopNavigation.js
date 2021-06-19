import React from 'react';
import { Layout, StyleService, useStyleSheet, Text, TopNavigation as UiKittenTopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";

import { BackIcon } from './Icons';
import { useNavigation } from '@react-navigation/native';

const TopNavigation = ({title, showBackAction, ...props}) => {
    const styles = useStyleSheet(themedStyle);
    const navigation = useNavigation();

    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
    );

    return (
    <SafeAreaView style={styles.container}>
        <Layout level='1'>
        <UiKittenTopNavigation
            alignment='start'
            title={() => <Text category='h5' style={{paddingLeft: 15}}>{title}</Text>}
            accessoryLeft={showBackAction ? renderBackAction : null}
            {...props}
        />
        </Layout>
    </SafeAreaView>
)};

const themedStyle = StyleService.create({
    container: {
      backgroundColor: 'background-basic-color-1',
    },
});

export default TopNavigation;