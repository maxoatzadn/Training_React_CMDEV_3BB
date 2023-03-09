import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import demoReducer from './slices/demo.slice';
import authReducer from './slices/auth.slice';
import jsonReducer from './slices/json.slice';
import cameraReducer from './slices/camera.slice';

const reducer = {demoReducer, authReducer, jsonReducer, cameraReducer};

export const store = configureStore({reducer, devTools: true});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
