import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import {kACCOUNT, kAUTHEN_SUCCESS, kYES} from '../../Constants';
import {User} from '../../types/user.type';
import { RootState } from '../store';

export type AuthState = {
  error: string | null;
  isFetching: boolean;
  token: string;
};

const defaultState: AuthState = {error: null, isFetching: false, token: ''};

export const register = createAsyncThunk(
  'auth/register',
  async (user: User) => {
    await AsyncStorage.setItem(kACCOUNT, JSON.stringify(user));
  },
);

export const login = createAsyncThunk('auth/login', async (user: User) => {
  const regUser = await AsyncStorage.getItem(kACCOUNT);

  if (!regUser) {
    throw new Error('Invalid Account - Never registered');
  }

  const regUserObj = JSON.parse(regUser) as User;
  if (
    regUserObj.username !== user.username ||
    regUserObj.password !== user.password
  ) {
    throw new Error('Invalid Username or Password');
  }

  await AsyncStorage.setItem(kAUTHEN_SUCCESS, kYES);

  // token
  return '5555';
});

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, state => {
      state.error = null;
      state.isFetching = false;
      state.token = '';
    });

    // login fullfilled
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.isFetching = false;
      state.token = action.payload;
    });

    // login failed
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message?.toString() ?? 'Unknow error';
      state.isFetching = false;
      state.token = '';
    });

    // login fetching
    builder.addCase(login.pending, state => {
      state.error = null;
      state.isFetching = true;
      state.token = '';
    });
  },
});

export default authSlice.reducer;
export const authSelector = (state: RootState) => state.authReducer;
