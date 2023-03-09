import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

import TabQRcode from './TabQRcode';
import ScannerScreen from './ScannerScreen';
import TabScanner from './TabScanner';
import { RootStackParamList, RootTabParamList } from './RootNavigationParams';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const tab1_Option: BottomTabNavigationOptions = {
  tabBarLabel: 'QRcode',
  tabBarIcon: ({ focused }) => (
    <Image
      style={{
        height: 28,
        width: 28,
      }}
      resizeMode="contain"
      source={
        focused
          ? require('./img/ic_qr_code_press.png')
          : require('./img/ic_qr_code_normal.png')
      }
    />
  ),
};

const tab2_Option: BottomTabNavigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <Image
      style={{
        height: 28,
        width: 28,
      }}
      resizeMode="contain"
      source={
        focused
          ? require('./img/ic_qr_scan_press.png')
          : require('./img/ic_qr_scan_normal.png')
      }
    />
  ),
};

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="QRCodeTab"
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="QRCodeTab"
        component={TabQRcode}
        options={tab1_Option} />
      <Tab.Screen
        name="ScannerTab"
        component={TabScanner}
        options={tab2_Option} />
    </Tab.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="MainTab" component={TabScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;