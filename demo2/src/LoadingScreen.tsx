import {Image, ImageBackground} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <ImageBackground
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      resizeMode="stretch"
      source={require('./assets/img/gradient_bg.png')}>
      <Image
        resizeMode="contain"
        source={require('./assets/img/cmdev_icon.png')}
        style={{height: 200, width: 250}}
      />
    </ImageBackground>
  );
};

export default LoadingScreen;
