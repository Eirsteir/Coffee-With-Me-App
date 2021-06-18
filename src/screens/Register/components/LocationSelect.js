import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout, Select, SelectItem, Spinner } from '@ui-kitten/components';

const LocationSelect = ({ locations, loading, error, onSelectionCompleted, ...layoutProps }) => {
    const [location, setLocation] = useState();
    const [selectedIndex, setSelectedIndex] = useState();
    const displayValue = selectedIndex && locations[selectedIndex.row].title;
    const children = useMemo(() => location !== undefined ? location.children.edges.map(edge => edge.node) : [], [location]);

    const renderLocations = () => locations.map(loc => (
        <SelectItem title={loc.title}/>
    ));

    const onSelect = (index) => {
        setSelectedIndex(index);
        const selectedLocation = locations[index.row];
        setLocation(selectedLocation);
        if (selectedLocation.itemType === "campus") {
            onSelectionCompleted(selectedLocation);
        }
    }

    const renderError = () => (
        <Text appearance='hint' status='danger' category='c1'>{error}</Text>
    )

  return (
    <Layout level='1' {...layoutProps}>
      <Select
        placeholder="Studiested"
        value={displayValue}
        caption={renderError}
        selectedIndex={selectedIndex}
        onSelect={onSelect}>
            {loading && <Spinner style={styles.loading} />}
            {locations && renderLocations()}
      </Select>
      {children.length > 0 && <LocationSelect locations={children} onSelectionCompleted={onSelectionCompleted}/>}
    </Layout>
  );
};

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default LocationSelect;
