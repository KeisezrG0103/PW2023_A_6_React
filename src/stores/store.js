import { configureStore } from '@reduxjs/toolkit'
import auth_reducer from '../slicers/auth/auth_slice'
import register_reducer from '../slicers/auth/register_slice'
import { getUser } from '../api/userApi'
import { kursusApi } from '../api/kursusApi'
import { persistReducer, persistStore } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'


const persistConfig = {
  key : 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, auth_reducer);


export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    register: register_reducer,
    [getUser.reducerPath]: getUser.reducer,
    [kursusApi.reducerPath]: kursusApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(getUser.middleware).concat(kursusApi.middleware)
  }
    
})


export const persistor = persistStore(store)