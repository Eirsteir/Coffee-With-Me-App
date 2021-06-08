import React from 'react';
import { Layout, StyleService, useStyleSheet, Text, TopNavigation as UiKittenTopNavigation } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";

const TopNavigation = ({title, ...props}) => {
    const styles = useStyleSheet(themedStyle);

    return (
    <SafeAreaView style={styles.container}>
        <Layout level='1'>
        <UiKittenTopNavigation
            alignment='left'
            title={() => <Text category='h5' style={{paddingLeft: 15}}>{title}</Text>}
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