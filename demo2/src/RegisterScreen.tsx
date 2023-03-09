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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootNavigationParams';
import {useSelector} from 'react-redux';
import {add, demoSelector, remove} from './store/slices/demo.slice';
import {useAppDispatch} from './store/store';
import {User} from './types/user.type';
import {register} from './store/slices/auth.slice';
import {ScrollView} from 'react-native-gesture-handler';

type RegisterScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Register'
>;
type Props = {};

const RegisterScreen = (props: Props) => {
  const demoReducer = useSelector(demoSelector);
  const dispatch = useAppDispatch();

  const [user, setUser] = React.useState<User>({
    username: '',
    password: '',
  });

  const navigation = useNavigation<RegisterScreenNavigationProps>();

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
              color="green"
              hint="Username"
              onChanged={text => setUser({...user, username: text})}
            />
            <View style={{height: 8}} />
            {/* Password Field */}
            <CMEntry
              color="purple"
              hint="Password"
              isPassword
              onChanged={text => setUser({...user, password: text})}
            />
            <View style={{height: 24}} />

            <View style={{paddingHorizontal: 24}}>
              {/* <Text>#Debug: {JSON.stringify(user)}</Text> */}
              <CMButton
                title="Register"
                varaint="contained"
                onPressed={async () => {
                  // Alert.alert(JSON.stringify(user));
                  await dispatch(register(user));
                  navigation.pop();
                }}
              />
              <View style={{height: 12}} />
              <CMButton
                title="Cancel"
                varaint="outline"
                onPressed={() => navigation.pop()}
              />
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
                    dispatch(add());
                  }}
                />
                <CMButton
                  title="(-)"
                  varaint="contained"
                  onPressed={() => {
                    // setCount(count - 1);
                    dispatch(remove());
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

export default RegisterScreen;
