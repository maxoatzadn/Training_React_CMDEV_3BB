import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, store} from '../store';

type DemoState = {
  count: number;
};

const initialState: DemoState = {
  count: 10,
};

export const addAsync = createAsyncThunk('demo/addAsync', async () => {
  await new Promise((resolve: any) => setTimeout(resolve, 1000));
  return store.getState().demoReducer.count + 1;
});

export const removeAsync = createAsyncThunk('demo/removeAsync', async () => {
  await new Promise((resolve: any) => setTimeout(resolve, 1000));
  return store.getState().demoReducer.count - 1;
});

const demoSlice = createSlice({
  name: 'demo',
  initialState: initialState,
  reducers: {
    add: state => {
      // interfere
      state.count = state.count + 1;
    },
    remove: state => {
      state.count = state.count - 1;
    },
  },
  extraReducers: builder => {
    builder.addCase(addAsync.fulfilled, (state, action) => {
      state.count = action.payload;
    });

    builder.addCase(removeAsync.fulfilled, (state, action) => {
      state.count = action.payload;
    });
  },
});

export const {add, remove} = demoSlice.actions;
export default demoSlice.reducer;
export const demoSelector = (state: RootState) => state.demoReducer;
