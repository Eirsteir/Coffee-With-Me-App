import React from 'react';
import { View, StyleSheet } from 'react-native';
import Granim from 'react-granim'


const gradients = [
  ['#9C27B0', '#FF4081'], 
  ['#7B1FA2', '#F8BBD0'], 
  ['#FF5252', '#607D8B'], 
  ['#FF5722', '#FFA000'],
];
 
const CoverImage = () => {
  console.log(gradients);

  return (
    <View style={styles.profileCover}>
      <View style={styles.profileCoverImage}>
        <Granim id='granim' states={{ 'default-state': {gradients: gradients }}}></Granim>
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
    height: 210,
    width: 100 + '%',
    position: 'absolute',
  },
});


export default CoverImage;
