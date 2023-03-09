/* eslint-disable react-native/no-inline-styles */
import React, {} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, {
  LatLng,
  Marker,
} from 'react-native-maps';
import openMap from 'react-native-open-maps';
import CustomCallout from './CustomCallout';
import {Callout} from 'react-native-maps';
import { useSelector } from 'react-redux';
import { addMarker, loadMarker, tab1Selector } from './store/slices/tab1Slice';
import { useAppDispatch } from './store/store';

type Props = {};

const Tab1Screen = (props: Props) => {
  const tab1Reducer = useSelector(tab1Selector);
  const dispatch = useAppDispatch();
  

  React.useEffect(() => {
    dispatch(loadMarker);
  }, [dispatch]);


  function onClickCallout(pos?: LatLng) {
    if (pos) {
      openMap({
        start: '13.6970244, 100.5130343',
        end: `${pos!.latitude}, ${pos!.longitude}`,
        provider: 'google',
      });
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        onCalloutPress={e => onClickCallout(e.nativeEvent.coordinate)}
        onPress={e => dispatch(addMarker(e.nativeEvent.coordinate))}
        style={styles.map}
        initialRegion={tab1Reducer.region}>
        {tab1Reducer.markers.map(coordinate => (
          <MyMarker key={JSON.stringify(coordinate)} coordinate={coordinate} />
        ))}
      </MapView>
      <Image
        resizeMode="contain"
        style={{
          width: '100%',
          height: 100,
          backgroundColor: '#000000',
          marginTop: 10,
        }}
        source={require('./assets/img/banner_react_map.png')}
      />
    </View>
  );
};

type MyMarkerProps = {
  coordinate: LatLng;
};

const MyMarker = ({coordinate}: MyMarkerProps) => {
  return (
    <Marker coordinate={coordinate}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./assets/img/cmdev_icon.png')}
          style={{
            height: 30,
            width: 30,
            borderColor: 'white',
            borderRadius: 15,
            borderWidth: 2,
          }}
        />
        <Text
          style={{
            color: '#FFF',
            fontSize: 12,
            backgroundColor: '#0007',
            borderRadius: 3,
          }}>
          {parseFloat(coordinate.latitude.toString()).toFixed(2)} °,{' '}
          {parseFloat(coordinate.longitude.toString()).toFixed(2)} °
        </Text>
      </View>

      <Callout tooltip style={styles.customView}>
        <CustomCallout>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {/** Showing image in android is not possible now (Lib. Bug) */}
            {Platform.OS === 'ios' ? (
              <Image
                resizeMode="cover"
                source={require('./assets/img/cmdev_icon.png')}
                style={{height: 20, width: 20, marginRight: 8}}
              />
            ) : null}

            <Text style={{fontWeight: 'bold'}}>Pos: </Text>
            <Text>
              {parseFloat(coordinate.latitude.toString()).toFixed(2)} °,{' '}
              {parseFloat(coordinate.longitude.toString()).toFixed(2)} °
            </Text>
          </TouchableOpacity>
        </CustomCallout>
      </Callout>
    </Marker>
  );
};

export default Tab1Screen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
  },
  banner: {
    height: 80,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  customView: {
    width: Platform.OS == 'ios' ? 190 : 160,
    height: 100,
  },
});