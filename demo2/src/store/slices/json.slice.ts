/* eslint-disable @typescript-eslint/no-unused-vars */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Youtube, YoutubeResponse} from '../../types/youtube.type';
import {RootState, store} from '../store';

export type jsonState = {
  dataArray: Youtube[];
  isFetching: boolean;
  isError: boolean;
};

const defaultState: jsonState = {
  dataArray: [],
  isFetching: false,
  isError: false,
};

export const loadData = createAsyncThunk('json/loadData', async () => {
  const httpClient = axios.create();
  httpClient.defaults.timeout = 3000;
  const url =
    'https://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=songs';
  const result = await httpClient.get<YoutubeResponse>(url);

  await new Promise((resolve: any) => setTimeout(resolve, 1000));
  return result.data;
});

const jsonSlice = createSlice({
  name: 'json',
  initialState: defaultState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadData.fulfilled, (state, action) => {
      state.dataArray = action.payload.youtubes;
      state.isError = false;
      state.isFetching = false;
    });

    builder.addCase(loadData.pending, state => {
      state.isFetching = true;
      state.isError = false;
      state.dataArray = [];
    });

    builder.addCase(loadData.rejected, state => {
      state.isError = true;
      state.isFetching = false;
      state.dataArray = [];
    });
  },
});

export const {} = jsonSlice.actions;
export default jsonSlice.reducer;
export const jsonSelector = (state: RootState) => state.jsonReducer;
