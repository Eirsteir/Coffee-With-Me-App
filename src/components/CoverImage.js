import React from 'react';
import { View, StyleSheet } from 'react-native';
import Granim from 'react-granim'

// lys lilla,  lilla, blå, mørk, rust, rødrosa, lilla
const gradients = [
  ['#FF4081', '#9C27B0'], 
  ['#7B1FA2', '#2d73b9'], 
  ['#607D8B', '#ab3c42'], 
  ['#FF5252', '#b82f53'], 
  ['#FF5722', '#FFA000'],
];

const CoverImage = () => {

  return (
    <View style={styles.profileCover}>
      <View style={styles.profileCoverImage}>
        <Granim id='granim' direction='left-right' states={{ 'default-state': {gradients: gradients }}}></Granim>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCover: {
    height: 200,
    position: 'absolute',
    width: 100 + '%',
  },
  profileCoverGradient: {
    height: 200,
    width: 100 + '%',
    position: 'absolute',
  },
  profileCoverImage: {
    height: 215,
    width: 100 + '%',
    position: 'absolute',
  },
});


export default CoverImage;
