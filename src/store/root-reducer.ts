import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import userReducer from './slices/user.slices';
import toastReducer from './slices/toast.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'toast'], // should match keys inside combineReducers
};

const rootReducers = combineReducers({
  toast: toastReducer,
  users: userReducer, // key matches whitelist
});

const persistedReducers = persistReducer(persistConfig, rootReducers);

export default persistedReducers;
