import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slicers/auth/auth_slice';
import registerReducer from '../slicers/auth/register_slice';
import { getUser } from '../api/userApi';
import { kursusApi } from '../api/kursusApi';
import { persistReducer, persistStore, FLUSH , REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import webinarApi from '../api/webinarApi';
import subscribeApi from '../api/subscriptionApi';
import webinarUserApi from '../api/ikutWebinar'; 

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    register: registerReducer,
    [getUser.reducerPath]: getUser.reducer,
    [kursusApi.reducerPath]: kursusApi.reducer,
    [webinarApi.reducerPath]: webinarApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
    [webinarUserApi.reducerPath]: webinarUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getUser.middleware,
      kursusApi.middleware,
      webinarApi.middleware,
      subscribeApi.middleware,
      webinarUserApi.middleware,
    ),
});

export const persistor = persistStore(store);
