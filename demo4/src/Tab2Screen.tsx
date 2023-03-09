/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// https://github.com/react-community/react-native-maps/blob/master/docs/mapview.md
import MapView, {
  Marker,
  AnimatedRegion,
  MapType,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

import SegmentedControlTab from 'react-native-segmented-control-tab';

const Tab2Screen = () => {
  let watchId: number = 0;
  const [mapType, setMapType] = useState<MapType>('standard');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      startLocationTracking();
    }

    // Clean up
    return () => {
      console.log('Unmounted', JSON.stringify(watchId));
      Geolocation.clearWatch(watchId);
    };
  });

  function startLocationTracking() {
    watchId = Geolocation.watchPosition(
      (position: any) => {
        console.log(JSON.stringify(position));
        coordinate.timing(position.coords).start(); // the coordinate is made from AnimatedRegion
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.log(JSON.stringify(error));
      },
      {
        enableHighAccuracy: true, // false for testing in building
        maximumAge: 5000,
        timeout: 5000,
      },
    );
  }

  // http://github.com/zoontek/react-native-permissions
  async function requestLocationPermission() {
    const checkLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (checkLocationPermission) {
      startLocationTracking();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cool Location App required Location permission',
            message:
              'We required Location permission in order to get device location ' +
              'Please grant us.',
            buttonPositive: 'Close',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startLocationTracking();
        } else {
          // "You don't have access for the location"
        }
      } catch (err: any) {
        // Error
      }
    }
  }

  function changeMapType(index: number) {
    setSelectedIndex(index);

    if (index === 0) {
      setMapType('standard');
    } else if (index === 1) {
      setMapType('satellite');
    } else {
      setMapType('hybrid');
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        style={styles.map}
        showsUserLocation={false} // default user location marker
        followsUserLocation
        showsMyLocationButton
        showsTraffic
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker.Animated coordinate={coordinate}>
          <Image
            source={require('./assets/img/avatar.png')}
            style={{
              height: 60,
              width: 60,
              borderColor: 'white',
              borderRadius: 20,
              borderWidth: 2,
            }}
          />
        </Marker.Animated>
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={{color: '#000'}}>
            {parseFloat(latitude.toString()).toFixed(3)},
            {parseFloat(longitude.toString()).toFixed(3)} °
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingLeft: 32, paddingRight: 32, width: '100%'}}>
        <SegmentedControlTab
          selectedIndex={selectedIndex}
          values={['Standard', 'Sattile', 'Hybrid']}
          onTabPress={index => changeMapType(index)}
        />
      </View>
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

export default Tab2Screen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderColor: '#0003',
    borderWidth: 1,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});