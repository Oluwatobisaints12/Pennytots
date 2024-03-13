import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { responsiveValue as rv } from 'app/providers/responsive-value';

const Animation = ({ image, end }: any) => {


  // If 'image' prop is falsy or 'show' is false, return null to not render anything
  if (!image) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.Image
        source={image}
        style={{ width: rv(200), height: rv(200) }}
        animation={'fadeIn'}
      />
    </View>
  );
};

export default Animation;
