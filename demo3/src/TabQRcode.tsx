/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import QRCode from 'react-native-qrcode-svg';
import MyQRCode from './MyQRCode';
const PATH_TO_LOGO = './img/cmdev_icon.png';
interface TabQRcodeProps { }

const TabQRcode: React.FunctionComponent<TabQRcodeProps> = props => {
  const [qrValue, setQrValue] = useState('');

  return (
    <ImageBackground
      source={require('./img/gradient_bg.png')}
      resizeMode={'stretch'}
      style={styles.container}>
      <Image
        resizeMode={'contain'}
        style={{
          width: '100%',
          height: 120,
          ...ifIphoneX({ marginTop: 30 }, { marginTop: 0 }),
          padding: 0,
        }}
        source={require('./img/header_react_native.png')}
      />
      <TextInput
        autoCapitalize="none"
        onChangeText={text => setQrValue(text)}
        placeholder="QRCode Value"
        style={{
          fontSize: 18,
          height: 40,
          textAlign: 'center',
          borderWidth: 1,
          borderColor: '#fff3',
          borderRadius: 5,
          marginLeft: 32,
          marginRight: 32,
          marginBottom: 32,
          marginTop: 32,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View>
          {[1, 2, 3, 4, 5].map(item => (
            <MyQRCode
              key={item.toString()}
              url={'http://awesome.link.qr/' + item}
              color={item % 2 ? 'red' : 'green'}
              logo={require(PATH_TO_LOGO)}
            />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default TabQRcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
  },
  section: {
    marginTop: 15,
    marginBottom: 15,
  },
});