import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import userReducer from './slices/user.slices';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'],
};

const rootReducers = combineReducers({
  users: userReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducers);
export default persistedReducers;
