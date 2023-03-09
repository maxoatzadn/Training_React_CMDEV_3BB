import React from 'react';
import {Alert, Image, TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tab1Screen from './Tab1Screen';
import Tab2Screen from './Tab2Screen';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {RootStackParamList, RootTabParamList} from './RootNavigationParams';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const RootStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeTabScreen} />
  </Stack.Navigator>
);

const tab1 = {
  tabBarLabel: 'Map',
  tabBarIcon: ({focused}: any) => (
    <Image
      style={{
        height: 28,
        width: 28,
      }}
      resizeMode="contain"
      source={
        focused
          ? require('./assets/img/ic_map_press.png')
          : require('./assets/img/ic_map_normal.png')
      }
    />
  ),
};

const tab2 = {
  tabBarLabel: 'GPS',
  tabBarIcon: ({focused}: any) => (
    <Image
      style={{
        height: 28,
        width: 28,
      }}
      resizeMode="contain"
      source={
        focused
          ? require('./assets/img/ic_location_press.png')
          : require('./assets/img/ic_location_normal.png')
      }
    />
  ),
};

const HomeTabScreen = () => (
  <Tab.Navigator initialRouteName="Tab1" screenOptions={{headerShown: false}}>
    <Tab.Screen name="Tab1" component={Tab1Screen} options={tab1} />
    <Tab.Screen name="Tab2" component={Tab2Screen} options={tab2} />
  </Tab.Navigator>
);

export default RootStack;
