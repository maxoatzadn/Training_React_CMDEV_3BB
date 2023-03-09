yarn add @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-gesture-handler

# index.js
-----------------------
// HOC
const NavApp = () => (  
    <NavigationContainer>
      <App />
    </NavigationContainer>  
);

AppRegistry.registerComponent(appName, () => NavApp);


# App.tsx
-----------------------
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView /> */}
      <AppNavigator
        isAuthened={isAuthened}
        onSignOut={() => {
          setIsAuthened(false);
          navigation.dispatch(StackActions.replace('Home', {}));
        }}
      />
    </View>
  );

# AppNavigator
-----------------------
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

# Stack 
<Stack.Navigator
      initialRouteName={isAuthened ? 'Success' : 'Home'}
      screenOptions={defaultOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Success"
        component={SuccessTab}
        options={successOption(onSignOut)}
      />
</Stack.Navigator>

# Tab
const SuccessTab = () => (
  <Tab.Navigator initialRouteName="Json" screenOptions={{headerShown: false}}>
    <Tab.Screen name="Json" component={JSONFeedScreen} options={tab1} />
    <Tab.Screen name="Camera" component={CameraScreen} options={tab2} />
  </Tab.Navigator>
);