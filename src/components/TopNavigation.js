import React from 'react';
import { Layout, StyleService, useStyleSheet, Text, TopNavigation as UiKittenTopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";

import { BackIcon } from './Icons';

const TopNavigation = ({title, showBackAction, ...props}) => {
    const styles = useStyleSheet(themedStyle);

    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon}/>
    );

    return (
    <SafeAreaView style={styles.container}>
        <Layout level='1'>
        <UiKittenTopNavigation
            alignment='left'
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