import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch} from './store/store';
import {useSelector} from 'react-redux';
import {jsonSelector, loadData} from './store/slices/json.slice';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, RootTabParamList} from './RootNavigationParams';
import {Youtube} from './types/youtube.type';
import messaging from '@react-native-firebase/messaging';

type JSONFeedScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Success'>,
  BottomTabNavigationProp<RootTabParamList, 'Json'>
>;

type Props = {};

const JSONFeedScreen = (props: Props) => {
  const dispatch = useAppDispatch();
  const jsonReducer = useSelector(jsonSelector);
  const navigation = useNavigation<JSONFeedScreenNavigationProps>();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  type RenderRowProp = {
    item: Youtube;
  };

  const renderRow = ({item}: RenderRowProp) => (
    <TouchableOpacity
      activeOpacity={0.3}
      style={styles.listCard}
      onPress={async () => {
        Linking.openURL(`https://www.youtube.com/watch?v=${item.id}`).catch(
          err => console.error("Couldn't load page", err),
        );
      }}>
      {/* Top section - Row */}
      <View style={styles.listCardView}>
        {/* Avatar */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Image source={{uri: item.avatar_image}} style={styles.listAvatar} />
        </TouchableOpacity>
        {/* Title and subtitle */}
        <View style={{flexDirection: 'column', flex: 0.95}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontWeight: 'bold'}}>
            {item.title}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.subtitle}
          </Text>
        </View>
      </View>

      {/* Bottom section */}
      <Image
        resizeMode="cover"
        source={{
          uri: item.youtube_image + '?dummy=1',
          method: 'GET',
          headers: {
            Pragma: 'no-cache',
          },
        }}
        style={styles.listYoutbeImage}
      />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={{alignItems: 'center'}}>
      {/* <Text style={{color: '#FFF'}}>{route.params?.username}</Text> */}
      <Image
        source={require('./assets/img/header_react_native.png')}
        resizeMode="contain"
        style={{height: 100, width: '100%'}}
      />
    </View>
  );

  if (jsonReducer.isError) {
    return (
      <ImageBackground
        source={require('./assets/img/gradient_bg.png')}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30}}>Something wrong</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/img/gradient_bg.png')}
      style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={renderHeader()}
        onRefresh={() => dispatch(loadData())}
        refreshing={jsonReducer.isFetching}
        data={jsonReducer.dataArray}
        style={{flex: 1}}
        renderItem={renderRow}
        keyExtractor={item => item.id}
      />
    </ImageBackground>
  );
};

export default JSONFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list_header: {
    width: '100%',
    height: 100,
  },
  listCard: {
    overflow: 'hidden',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 0,
  },
  listCardView: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 45,
    alignItems: 'center',
  },
  listAvatar: {
    width: 45,
    height: '100%',
    marginRight: 16,
  },
  listTitleSubtitleContainer: {
    flexDirection: 'column',
    marginRight: 16,
    flex: 1,
  },
  listTitle: {
    fontWeight: '700',
  },
  listSubTitle: {
    fontWeight: '100',
    lineHeight: 1,
  },
  listYoutbeImage: {
    width: '100%',
    height: 190,
  },
});
