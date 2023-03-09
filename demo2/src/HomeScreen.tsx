/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import CMButton from './components/CMButton';
import CMEntry from './components/CMEntry';
import {StackActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootNavigationParams';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from './store/store';
import {
  add,
  addAsync,
  demoSelector,
  remove,
  removeAsync,
} from './store/slices/demo.slice';
import {login} from './store/slices/auth.slice';
import {ScrollView} from 'react-native-gesture-handler';

type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
type Props = {};

const HomeScreen = (props: Props) => {
  const [user, setUser] = React.useState({
    username: '',
    password: '',
  });

  const demoReducer = useSelector(demoSelector);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<HomeScreenNavigationProps>();

  return (
    <ImageBackground
      source={require('./assets/img/gradient_bg.png')}
      style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <Image
            resizeMode="contain"
            source={require('./assets/img/header_react_native.png')}
            style={{width: '100%'}}
          />

          <View
            style={{
              backgroundColor: '#FFF7',
              margin: 30,
              borderRadius: 10,
              paddingVertical: 32,
            }}>
            {/* Username Field */}
            <CMEntry
              icon="user"
              color="green"
              hint="Username"
              onChanged={text => setUser({...user, username: text})}
            />
            <View style={{height: 8}} />
            {/* Password Field */}
            <CMEntry
              icon="lock"
              color="purple"
              hint="Password"
              isPassword
              onChanged={text => setUser({...user, password: text})}
            />
            <View style={{height: 24}} />

            <View style={{paddingHorizontal: 24}}>
              {/* <Text>#Debug: {JSON.stringify(user)}</Text> */}
              <CMButton
                title="LoginX"
                varaint="contained"
                onPressed={() =>
                  // Promise/Task/Future/Future
                  dispatch(login(user)).then(result => {
                    if (login.fulfilled.match(result)) {
                      navigation.dispatch(
                        StackActions.replace('Success', {
                          screen: 'Json',
                        }),
                      );
                    } else {
                      Alert.alert('Login failed: ' + result.error.message);
                    }
                  })
                }
              />
              <View style={{height: 12}} />
              <CMButton
                title="Register"
                varaint="outline"
                onPressed={() => navigation.navigate('Register')}
              />
              <View style={{height: 12}} />
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <CMButton
                  title="(+)"
                  varaint="contained"
                  onPressed={() => {
                    // setCount(count + 1);
                    // dispatch(add());
                    dispatch(addAsync());
                  }}
                />
                <CMButton
                  title="(-)"
                  varaint="contained"
                  onPressed={() => {
                    // setCount(count - 1);
                    // dispatch(remove());
                    dispatch(removeAsync());
                  }}
                />
                <Text style={{fontSize: 20}}>{demoReducer.count}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
