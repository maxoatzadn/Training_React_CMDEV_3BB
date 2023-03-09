import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { RootState } from '../store';

export type Tab2State = {
  message:string
};

const defaultState: Tab2State = {message:''};

// export const register = createAsyncThunk(
//   'auth/register',
//   async (user: User) => {
//     await AsyncStorage.setItem(kACCOUNT, JSON.stringify(user));
//   },
// );



const tab2Slice = createSlice({
  name: 'tab2',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder => {
   
  },
});

export default tab2Slice.reducer;
export const tab2Selector = (state: RootState) => state.tab2Reducer;