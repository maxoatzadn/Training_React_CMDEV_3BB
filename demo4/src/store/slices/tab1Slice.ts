import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { RootState } from '../store';
import { LatLng, Region } from 'react-native-maps';
import { Dimensions } from 'react-native';
import  Axios  from 'axios';
const { width, height } = Dimensions.get('window');
const ipAddress = '192.168.90.72';
const ASPECT_RATIO = width / height;
// 13.6970244, 100.5130343 codemobiles office
const LATITUDE = 13.6970244;
const LONGITUDE = 100.5130343;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export type Tab1State = {
    markers: LatLng[],
    region: Region
};

const defaultState: Tab1State = {
    markers: [],
    region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
};

export const loadMarker = createAsyncThunk(
  'tab1/loadMarkers',
  async () => {
    let result = await Axios.get<LatLng[]>(`http://${ipAddress}:3001/position`);
    return result.data;
    // setMarkers(result.data);
  },
);

export const addMarker = createAsyncThunk(
    'tab1/addMarkers',
    async (coordinate: LatLng) => {
        console.log(JSON.stringify(coordinate));
    
        try {
          let result = await Axios.post(
            `http://${ipAddress}:3001/record_position`,
            coordinate,
          );
          console.log(JSON.stringify(result));
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      // setMarkers(result.data);
      return coordinate;
    },
  );

const tab1Slice = createSlice({
    name: 'tab1',
    initialState: defaultState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadMarker.fulfilled, (state,action) => {
            state.markers = action.payload;
        });
        builder.addCase(addMarker.fulfilled, (state,action) => {
        // setRegion({...region, ...coordinate});
        state.region = {...state.region, ...action.payload};
        // setMarkers([...markers, coordinate]);
        state.markers = [...state.markers, action.payload];
        });
    },
});

export default tab1Slice.reducer;
export const tab1Selector = (state: RootState) => state.tab1Reducer;
