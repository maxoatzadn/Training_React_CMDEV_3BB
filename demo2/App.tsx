import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from './src/HomeScreen';
import AppNavigator from './src/AppNavigator';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {kAUTHEN_SUCCESS, kYES} from './src/Constants';
import LoadingScreen from './src/LoadingScreen';

type Props = {};

const App = (props: Props) => {
  const [isAuthened, setIsAuthened] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    // called when component is created
    checkSession();

    return () => {
      // called when component is destroyed
    };
  }, [isAuthenticating]);

  const checkSession = async () => {
    const _isAuthened = await AsyncStorage.getItem(kAUTHEN_SUCCESS);
    if (_isAuthened && _isAuthened === kYES) {
      setIsAuthened(true);
    }

    setTimeout(() => {
      setIsAuthenticating(false);
    }, 100);
  };

  // while authenticating
  if (isAuthenticating) {
    return <LoadingScreen />;
  }

  // after finish authentication
  return (
    <View style={{flex: 1}}>
      <AppNavigator
        isAuthened={isAuthened}
        onLogout={() => {
          setIsAuthened(false);
          navigation.dispatch(StackActions.replace('Home'));
        }}
      />
    </View>
  );
};

export default App;
