import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import tab1Reducer from './slices/tab1Slice';
import tab2Reducer from './slices/tab2Slice';


const reducer = {tab1Reducer , tab2Reducer };

export const store = configureStore({reducer, devTools: true});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
