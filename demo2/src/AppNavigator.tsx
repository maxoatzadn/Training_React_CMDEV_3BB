/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import JSONFeedScreen from './JSONFeedScreen';
import CameraScreen from './CameraScreen';
import {RootStackParamList, RootTabParamList} from './RootNavigationParams';
import {Alert, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {DefaultNavigatorOptions} from '@react-navigation/native';

const defaultOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#119CED',
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {color: '#fff'},
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const tab1: BottomTabNavigationOptions = {
  tabBarLabel: 'JSON',
  tabBarIcon: ({focused}: any) => (
    <Icon name="user" size={30} color={focused ? '#119CED' : '#0007'} />
  ),
};

const tab2: BottomTabNavigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({focused}: any) => (
    <Icon name="camera" size={30} color={focused ? '#119CED' : '#0007'} />
  ),
};

const successOption = (onSignOut: () => void) => {
  return {
    ...defaultOptions,
    title: 'Success',
    headerRight: () => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={async () => {
          await AsyncStorage.clear();
          onSignOut();
        }}
        style={{padding: 10}}>
        <Icon
          name="sign-out"
          size={20}
          color="#fff"
          style={{
            height: 24,
            width: 24,
          }}
        />
      </TouchableOpacity>
    ),
  };
};

const SuccessTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Camera"
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Json" component={JSONFeedScreen} options={tab1} />
      <Tab.Screen name="Camera" component={CameraScreen} options={tab2} />
    </Tab.Navigator>
  );
};

type RootStackProps = {
  isAuthened: boolean;
  onLogout: () => void;
};

const RootStack = ({isAuthened, onLogout}: RootStackProps) => {
  return (
    <Stack.Navigator
      initialRouteName={isAuthened ? 'Success' : 'Home'}
      screenOptions={defaultOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Success"
        component={SuccessTab}
        options={successOption(onLogout)}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
